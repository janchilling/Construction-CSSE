import React, { useState, useEffect } from "react";
import '../EmployeeDetails/AllEmployee.css';
import axios from "axios";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewAllEmployee() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getEmployees();
    }, [])

    const getEmployees = async () => {
        const response = await axios.get("http://localhost:8070/employees/allEmployees");

        if (response.status === 200) {
            setData(response.data);
            console.log(data);
        }
    }

    //delete
    const onDeleteEmployee = async (_id) => {
        if (window.confirm("Are you sure that you want to delete this appointment?")) {
            const response = await axios.delete(`http://localhost:8070/employees/deleteEmployee/${_id}`);
            if (response.status === 200) {
                toast.success("Employee deleted!");
                getEmployees();
            }
        }
    }

    return (

        <div className="TJViewAppointmentPage">
            <br />
            <h1 className="TJViewHeading">All Employees</h1>
            <table className="TJViewTable">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Full Name</th>
                        <th style={{ textAlign: "center" }}>Employee ID</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Address</th>
                        <th style={{ textAlign: "center" }}>Phone</th>
                        <th style={{ textAlign: "center" }}>Gender</th>
                        <th style={{ textAlign: "center" }}>UserType</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        
                        return (
                            
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.Fullname}</td>
                                <td>{item.EmployeeID}</td>
                                <td>{item.Email}</td>
                                <td>{item.Address}</td>
                                <td>{item.Phone}</td>
                                <td>{item.Gender}</td>
                                <td>{item.UserType}</td>
                                <td>
                                    <button className="TJButton TJButton-update" variant="primary" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/updateEmployee/${item._id}`;
                                    }}>Update</button><br />

                                    <button className="TJButton TJButton-delete" onClick={() => onDeleteEmployee(item._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br /><br />
            <ToastContainer />
        </div>
    )

}

export default ViewAllEmployee;