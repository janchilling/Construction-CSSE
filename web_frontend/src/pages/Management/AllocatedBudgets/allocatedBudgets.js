import React, { useState, useEffect } from "react";
import "../AllocatedBudgets/allocatedBudgets.css";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function ApprovedOrders() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    // const params = useParams(); // Get URL parameters

    useEffect(() => {
        getApprovedOrders();
    }, [])

    const getApprovedOrders = async () => {
        const response = await axios.get("http://localhost:8070/allocate/allAllocates");

        if (response.status === 200) {
            setData(response.data);
        }
    }

    const DeleteAllocation = async (id) => { // Pass the id to the function
        let result = await axios.delete(`http://localhost:8070/allocate/deleteAllocate/${id}`);
        
        if (result.status === 200) {
            toast.success('Allocation Deleted Successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
    
            setTimeout(() => {
                navigate('/allocatedBudgets'); // Correct navigation
                window.location.reload(); // Reload the page
            }, 2000);
        }
    }
    

    return (
        <div className="MGViewAppointmentPage">
            <br />
            <h1 className="MGViewHeading">All Allocated Budgets</h1>
            <br />
            <table className="MGViewTableReq">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Site Name</th>
                        <th style={{ textAlign: "center" }}>Allocate Budget</th>
                        <th style={{ textAlign: "center" }}>Total Amount Required</th>
                        <th style={{ textAlign: "center" }}>StartDate</th>
                        <th style={{ textAlign: "center" }}>EndDate</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((Allocates, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{Allocates.SiteName}</td>
                                <td>{Allocates.AllocateBudget}</td>
                                <td>{Allocates.TotalAmountRequired}</td>
                                <td>{Allocates.StartDate}</td>
                                <td style={{ color: "Red", fontWeight: "bold" }}>{Allocates.EndDate}</td>
                                <td>
                                    <button
                                        className="MGButton MGButton-update"
                                        variant="primary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/updateAllocation/${Allocates._id}`;
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="MGButton MGButton-update"
                                        variant="danger"
                                        onClick={() => DeleteAllocation(Allocates._id)} // Pass id
                                    >
                                        Delete
                                    </button>
                                    <br />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <br /><br />
            <ToastContainer />
        </div>
    )
}
