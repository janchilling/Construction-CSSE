import React, { useState, useEffect } from "react";
import "../Orders/order.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApprovedOrders() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getApprovedOrders();
    }, [])

    const getApprovedOrders = async () => {
        const response = await axios.get("http://localhost:8070/requisitions/allRequistions");

        if (response.status === 200) {
            setData(response.data);
            console.log(data);
        }
    }

    return (

        <div className="MGViewAppointmentPage">
            <br />
            <h1 className="MGViewHeading">All Approved Orders</h1>
            <br/>
            <table className="MGViewTableReq">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>SiteManager ID</th>
                        <th style={{ textAlign: "center" }}>Site Name</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Total Amount</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((requisitions, index) => {
                        if (requisitions.Status === "Approved") {
                            return (

                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{requisitions.SiteManagerID}</td>
                                    <td>{requisitions.SiteName}</td>
                                    <td>{requisitions.Date}</td>
                                    <td>{requisitions.TotalAmount}</td>
                                    <td style={{ color: "#2CD611", fontWeight: "bold" }}>{requisitions.Status}</td>
                                    <td>
                                        <button className="MGButton MGButton-update" variant="primary" onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/purchaseOrder/${requisitions._id}`;
                                        }}>Purchase</button>
                                        <button className="MGButton MGButton-update" variant="primary" onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/allocateBudget/${requisitions._id}`;
                                        }}>Allocate</button><br />

                                    </td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
            <br /><br />
            <ToastContainer />
        </div>
    )

}