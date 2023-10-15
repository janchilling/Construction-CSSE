import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PurchaseOrder() {

    const { id } = useParams();
    const [SupplierName, setSupplierName] = useState("");
    const [SiteManagerID, setSiteManagerID] = useState("");
    const [SiteManagerName, setSiteManagerName] = useState("");
    const [SiteName, setSiteName] = useState("");
    const [Date, setDate] = useState("");
    const [TotalAmount, setTotalAmount] = useState(0);
    const [Materials, setMaterials] = useState([]);
    const [CardType, setCardType] = useState("");
    const [CardNumber, setCardNumber] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);

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
        e.preventDefault();

        const newOrder = {
            SupplierName,
            RequisitionID: id,
            SiteManagerID,
            SiteManagerName,
            SiteName,
            Date,
            TotalAmount,
            Materials,
            CardType,
            CardNumber
        };

        axios.post("http://localhost:8070/orders/newOrder", newOrder)
            .then((response) => {
                if (response.status === 200) {
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
                }
            })
            .catch((error) => {
                console.error('Error creating order:', error);
            });
    }

    return (
        <div>
            <h1>Purchase Order Form</h1>
            {dataLoaded ? (
                <form onSubmit={sendOrderData}>
                    <div>
                        <label htmlFor="SupplierName">Supplier Name:</label>
                        <input
                            type="text"
                            id="SupplierName"
                            name="SupplierName"
                            onChange={(e) => setSupplierName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
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

                    <div>
                        <label htmlFor="SiteManagerName">Site Manager Name:</label>
                        <input
                            type="text"
                            id="SiteManagerName"
                            name="SiteManagerName"
                            onChange={(e) => setSiteManagerName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
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

                    <div>
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

                    <div>
                        <label htmlFor="Materials">Materials:</label>
                        <textarea
                            id="Materials"
                            name="Materials"
                            value={Materials.map(material =>
                                `${material.MaterialName}, ${material.MaterialQuantity}, ${material.MaterialPrice}`
                            ).join('\n')}
                            onChange={(e) => {
                                const materialLines = e.target.value.split('\n');
                                const updatedMaterials = materialLines.map(line => {
                                    const [name, quantity, price] = line.split(', ');
                                    return {
                                        MaterialName: name,
                                        MaterialQuantity: quantity,
                                        MaterialPrice: price
                                    };
                                });
                                setMaterials(updatedMaterials);
                            }}
                            required
                        />
                    </div>


                    <div>
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
                    <div>
                        <label htmlFor="cardType">Card Type:</label>
                        <select
                            id="cardType"
                            name="cardType"
                            onChange={(e) => {
                                console.log("Card Type changed:", e.target.value);
                                setCardType(e.target.value);
                            }} // Update the selected value
                            required
                        >
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>


                    <div>
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                            type="number"
                            id="cardNumber"
                            name="cardNumber"
                            onChange={(e) => {
                                console.log("Card Number changed:", e.target.value);
                                setCardNumber(e.target.value);
                            }} // Update the value
                        />
                    </div>
                    {/* Display CardType and CardNumber values */}
                    <div>
                        <p>Card Type: {CardType}</p>
                        <p>Card Number: {CardNumber}</p>
                    </div>

                    <div>
                        <button type="submit">Submit Order</button>
                    </div>
                </form>
            ) : (
                <p>Loading data...</p>
            )}
            <ToastContainer />
        </div>

    );
}
