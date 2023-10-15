import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../PurchaseOrder/purchaseOrder.css';

export default function PurchaseOrder() {
    const { id } = useParams();
    const [requisitionData, setRequisitionData] = useState(null);
    const [endDate, setEndDate] = useState(""); // Initialize End Date as empty
    const [startDate, setStartDate] = useState(new Date().toISOString()); // Initialize Start Date as the current date
    const [allocateBudget, setAllocateBudget] = useState(0); // Initialize AllocateBudget
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
                setRequisitionData(requisitionData);
            } else {
                toast.error('Failed to fetch requisition data', {
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

        if (!requisitionData) {
            toast.error('Requisition data is not available.');
            return;
        }

        const newAllocateBudget = {
            SiteName: requisitionData.SiteName,
            TotalAmountRequired: requisitionData.TotalAmount,
            AllocateBudget: allocateBudget, 
            StartDate: startDate,
            EndDate: endDate,
        };

        axios.post("http://localhost:8070/allocate/newAllocate", newAllocateBudget)
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Allocate budget created successfully!', {
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
                    }, 6000);
                } else {
                    toast.error('Failed to create the allocate budget', {
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
                console.error('Error creating allocate budget:', error);
            });
    }

    return (
        <div className="purchase-order-container">
            <h1>Purchase Order Form</h1>
            {requisitionData ? (
                <form onSubmit={sendOrderData}>
                    <div className="form-group">
                        <label htmlFor="SiteName">Site Address: {requisitionData.SiteName}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="TotalAmount">Total Amount: {requisitionData.TotalAmount}</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="AllocateBudget">Allocate Budget:</label>
                        <input
                            type="number"
                            id="AllocateBudget"
                            name="AllocateBudget"
                            value={allocateBudget} 
                            onChange={(e) => setAllocateBudget(Number(e.target.value))}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="StartDate">Start Date:</label>
                        <input
                            type="date"
                            id="StartDate"
                            name="StartDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="EndDate">End Date:</label>
                        <input
                            type="date"
                            id="EndDate"
                            name="EndDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="button-container">
                        <button className="submit-button" type="submit">Submit Allocate Budget</button>
                    </div>
                </form>
            ) : (
                <p>Loading requisition data...</p>
            )}
            <ToastContainer />
        </div>
    );
}
