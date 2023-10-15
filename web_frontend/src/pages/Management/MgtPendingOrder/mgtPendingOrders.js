import React, {useState, useEffect} from "react";
import "../MgtPendingOrder/mgtPendingOrders.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManagementPendingOrders() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getManagementPendingOrders();
    }, [])

    const getManagementPendingOrders = async () => {
        const response = await axios.get("http://localhost:8070/requisitions/allRequistions");

        if (response.status === 200) {
            setData(response.data);
            console.log(data);
        }
    }

    return (

        <div className="TJViewAppointmentPage">
            <br />
            <h1 className="TJViewHeading">All Pending Orders</h1>
            <br/>
            <table className="TJViewTableReq">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>SiteManager ID</th>
                        <th style={{ textAlign: "center" }}>Site Name</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Total Amount</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Decision</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        if (item.Status === "Pending") {
                            return (

                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.SiteManagerID}</td>
                                    <td>{item.SiteName}</td>
                                    <td>{item.Date}</td>
                                    <td>{item.TotalAmount}</td>
                                    <td style={{ color: "#E2B309", fontWeight: "bold" }}>{item.Status}</td>
                                    <td>
                                        <button className="TJButton TJButton-update" variant="primary" onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/updateEmployee/${item._id}`;
                                        }}>Update</button><br />

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