import React, { useEffect, useState } from "react";
import '../UpdateEmployees/updateEmployee.css';
import { useParams } from "react-router-dom";

export default function UpdateEmployee() {

    const [Fullname, setFullName] = useState("");
    const [EmployeeID, setEmployeeID] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [UserType, setUserType] = useState("");
    const [Gender, setGender] = useState("");
    const [Password, setPassword] = useState("");

    const params = useParams();

    useEffect(() => {
        getEmployeeDetails();
    }, [])

    const getEmployeeDetails = async () => {
        let result = await fetch(`http://localhost:8070/employees/getEmployee/${params.id}`);
        result = await result.json();

        setFullName(result.employee.Fullname)
        setEmployeeID(result.employee.EmployeeID)
        setEmail(result.employee.Email)
        setAddress(result.employee.Address)
        setPhone(result.employee.Phone)
        setUserType(result.employee.UserType)
        setGender(result.employee.Gender)
        setPassword(result.employee.Password)

        console.log(result.employee);
    }

    const updateEmployee = async () => {
        let result = await fetch(`http://localhost:8070/employees/updateEmployee/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ Fullname, EmployeeID, Email, Address, Phone, UserType, Gender, Password }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        result = await result.json()

        if (result) {
            alert("Employee Updated Successfully!")

            window.location.href = `/allEmployees`;
        }
    }

    return (
        <div className="TJUpdatePage">
            <h1 className="TJUpdateHeading">Employee - UPDATE</h1>
            <div className="TJUpdateForm">
                <br />
                <label for="subject" className="TJUpdateFormHeading">Full Name: </label><br />
                <input type="text" className="TJUpdateFormInput" value={Fullname} onChange={(e) => {
                    setFullName(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Employee ID: </label><br />
                <input type="text" className="TJUpdateFormInput" value={EmployeeID} onChange={(e) => {
                    setEmployeeID(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Email: </label><br />
                <input type="email" className="TJUpdateFormInput" value={Email} onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Address: </label><br />
                <input type="text" className="TJUpdateFormInput" value={Address} onChange={(e) => {
                    setAddress(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Telephone Number: </label><br />
                <input type="Number" className="TJUpdateFormInput" value={Phone} onChange={(e) => {
                    setPhone(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Gender: </label><br />
                <input type="text" className="TJUpdateFormInput" value={Gender} onChange={(e) => {
                    setGender(e.target.value)
                }} readOnly />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">UserType: </label><br />
                <input type="text" className="TJUpdateFormInput" value={UserType} onChange={(e) => {
                    setUserType(e.target.value)
                }} readOnly />
                <br /><br /><br /><br />

                <button className="TJUpdateSubmit" onClick={updateEmployee}>Update</button>&nbsp;&nbsp;&nbsp;
                <button className="TJButtonCancel" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/allEmployees`;
                }}>Cancel</button> <br />

            </div>

            <br /><br />
        </div>
    )
}