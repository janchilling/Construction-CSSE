import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../PurchaseOrder/purchaseOrder.css'

export default function PurchaseOrder() {

    const { id } = useParams();
    const [SupplierName, setSupplierName] = useState("");
    const [SiteManagerID, setSiteManagerID] = useState("");
    const [SiteManagerName, setSiteManagerName] = useState("");
    const [SiteName, setSiteName] = useState("");
    const [Date, setDate] = useState("");
    const [TotalAmount, setTotalAmount] = useState(0);
    const [ReduceAmount, setReduceAmount] = useState(0);
    const [Materials, setMaterials] = useState([]);
    const [CardType, setCardType] = useState("");
    const [CardNumber, setCardNumber] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);
    const [requisitionData, setRequisitionData] = useState(null); // Store requisition data
    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            fetchDataFromRequisitionModel(id);
        }
    }, [id]);

    async function fetchDataFromRequisitionModel(id) {
        try {
            const response = await axios.get(`http://localhost:8070/requisitions/singleRequistions/${id}`);
            if (response.status === 200) {
                const requisitionData = response.data;
                setRequisitionData(requisitionData); // Update the requisition data
                setSupplierName(requisitionData.SupplierName);
                setSiteManagerID(requisitionData.SiteManagerID);
                setSiteManagerName(requisitionData.SiteManagerName);
                setSiteName(requisitionData.SiteName);
                setDate(requisitionData.Date);
                setTotalAmount(requisitionData.TotalAmount);
                setMaterials(requisitionData.Materials);
                setCardType(requisitionData.CardType);
                setCardNumber(requisitionData.CardNumber);
                setDataLoaded(true);
            } else {
                toast.error('Failed to fetch requisition data.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function sendOrderData(e) {
        return new Promise((resolve, reject) => {
            e.preventDefault();

            if (!SupplierName || !SiteManagerName || !Date || ReduceAmount <= 0 || isNaN(ReduceAmount) || isNaN(CardNumber)) {
                // Display an error message for invalid inputs.
                toast.error('Invalid or missing input data.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }

            const newTotalAmount = requisitionData.TotalAmount - ReduceAmount;

            const newOrder = {
                SupplierName,
                RequisitionID: id,
                SiteManagerID,
                SiteManagerName,
                SiteName,
                Date,
                TotalAmount: newTotalAmount, // Use the new TotalAmount
                Materials,
                CardType,
                CardNumber
            };

            const createOrderRequest = axios.post("http://localhost:8070/orders/newOrder", newOrder)
                .then((response) => {
                    if (response.status === 200) {
                        // Update the material count in the requisition
                        const updatedRequisition = { ...requisitionData }; // Make sure to get the current requisition data
                        updatedRequisition.Materials = updatedRequisition.Materials.map(material => {
                            // Find the corresponding material in the requisition and reduce the count
                            const purchasedMaterial = Materials.find(p => p.MaterialName === material.MaterialName);
                            if (purchasedMaterial) {
                                const remainingCount = material.MaterialQuantity - purchasedMaterial.MaterialQuantity;
                                return {
                                    ...material,
                                    MaterialQuantity: remainingCount,
                                };
                            }
                            return material;
                        });

                        updatedRequisition.TotalAmount = newTotalAmount;

                        // Send a request to update the requisition with the reduced material count
                        axios.put(`http://localhost:8070/requisitions/updateRequisition/${id}`, updatedRequisition)
                            .then(requisitionResponse => {
                                if (requisitionResponse.status === 200) {
                                    toast.success('Order created successfully!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    setTimeout(() => {
                                        navigate("/orders");
                                        resolve(); // Resolve the promise here
                                    }, 6000);
                                } else {
                                    toast.error('Failed to update the requisition.', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    reject('Failed to update the requisition.');
                                }
                            })
                            .catch(error => {
                                console.error('Error updating the requisition:', error);
                                reject(error);
                            });


                    } else {
                        toast.error('Failed to fetch AllocateBudget data.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching AllocateBudget data:', error);
                });

            const updateBudget = axios.get(`http://localhost:8070/allocate/FetchAllocateBudget/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        const allocateBudgetData = response.data;

                        // Now you have the AllocateBudget data, and you can calculate the new budget.
                        const newAllocateBudget = allocateBudgetData.AllocateBudget - ReduceAmount;

                        // Create an object with the updated AllocateBudget data.
                        const updatedAllocateBudget = {
                            RequisitionID: id,
                            TotalAmountRequired: newTotalAmount,
                            AllocateBudget: newAllocateBudget
                        };

                        // Now you can use another Axios request to update the AllocateBudget.
                        axios.put(`http://localhost:8070/allocate/UpdateAllocateBudget/${id}`, updatedAllocateBudget)
                            .then(allocateBudgetResponse => {
                                if (allocateBudgetResponse.status === 200) {
                                    toast.success('Update Budget successfully!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    setTimeout(() => {
                                        navigate("/orders");
                                        resolve();
                                    }, 6000);
                                } else {
                                    toast.error('Failed to update the AllocateBudget.', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    reject('Failed to update the AllocateBudget.');
                                }
                            })
                            .catch(error => {
                                console.error('Error updating the AllocateBudget:', error);
                                reject(error);
                            });
                    } else {
                        toast.error('Failed to create the order.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        reject('Failed to create the order.');
                    }
                })
                .catch((error) => {
                    console.error('Error creating order:', error);
                    reject(error);
                });
        });
    }


    return (
        <div className="purchase-order-container">
            <h1>Purchase Order Form</h1>
            {dataLoaded ? (
                <form onSubmit={sendOrderData}>
                    <div className="form-group">
                        <label htmlFor="SupplierName">Supplier Name:</label>
                        <input
                            type="text"
                            id="SupplierName"
                            name="SupplierName"
                            onChange={(e) => setSupplierName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="SiteManagerID">Site Manager ID:</label>
                        <input
                            type="text"
                            id="SiteManagerID"
                            name="SiteManagerID"
                            value={SiteManagerID}
                            onChange={(e) => setSiteManagerID(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="SiteManagerName">Site Manager Name:</label>
                        <input
                            type="text"
                            id="SiteManagerName"
                            name="SiteManagerName"
                            onChange={(e) => setSiteManagerName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="SiteName">Site Name:</label>
                        <input
                            type="text"
                            id="SiteName"
                            name="SiteName"
                            value={SiteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Date">Date:</label>
                        <input
                            type="text"
                            id="Date"
                            name="Date"
                            value={Date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Materials">Materials:</label>
                        <textarea
                            id="Materials"
                            name="Materials"
                            value={Materials.map((material) =>
                                `${material.MaterialName}, ${material.MaterialQuantity}`
                            ).join("\n")}
                            onChange={(e) => {
                                const materialLines = e.target.value.split("\n");
                                const updatedMaterials = materialLines.map((line) => {
                                    const [name, quantity, price] = line.split(", ");
                                    return {
                                        MaterialName: name,
                                        MaterialQuantity: quantity,
                                    };
                                });
                                setMaterials(updatedMaterials);
                            }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="TotalAmount">Total Amount:</label>
                        <input
                            type="text"
                            id="TotalAmount"
                            name="TotalAmount"
                            value={TotalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ReduceAmount">Reduce Amount:</label>
                        <input
                            type="number"
                            id="ReduceAmount"
                            name="ReduceAmount"
                            onChange={(e) => setReduceAmount(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardType">Card Type:</label>
                        <select
                            id="cardType"
                            name="cardType"
                            onChange={(e) => {
                                console.log("Card Type changed:", e.target.value);
                                setCardType(e.target.value);
                            }}
                            required
                        >
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                            type="number"
                            id="cardNumber"
                            name="cardNumber"
                            onChange={(e) => {
                                console.log("Card Number changed:", e.target.value);
                                setCardNumber(e.target.value);
                            }}
                        />
                    </div>


                    <div class="button-container">
                        <button class="submit-button" type="submit">Submit Order</button>
                    </div>
                </form>
            ) : (
                <p>Loading data...</p>
            )}
            <ToastContainer />
        </div>
    );
}
