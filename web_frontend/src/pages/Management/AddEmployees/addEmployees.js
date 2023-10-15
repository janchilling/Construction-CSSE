import React, { useState } from "react";
import './addEmployees.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signup_logo from "../../../images/AddEmployee_img/emplogo.jpg";
import signup_logo_1 from "../../../images/AddEmployee_img/emplogo1.jpg";
import signup_logo_2 from "../../../images/AddEmployee_img/emplogo2.jpg";


export default function AddEmployee() {

    const [Fullname, setName] = useState("");
    const [EmployeeID, setEmployeeID] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [UserType, setUserType] = useState("");
    const [Gender, setGender] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newUser = {
            Fullname,
            EmployeeID,
            Email,
            Address,
            Phone,
            UserType,
            Gender,
            Password,
            confirmpassword
        }

        if (Password !== confirmpassword) {
            toast.error('Passwords do not match...!', {
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

        axios.post("http://localhost:8070/auth/registerEmployee", newUser).then(() => {
            alert("New Employee Added")
            window.location.href = `/managerHome`;
        }).catch((err) => {
            alert(err)
        })
    }


    return (
        <div className="reg_page">

            <div className="loginDev1">
                <img src={signup_logo} className="signupImg" width="30%" />
                <img src={signup_logo_1} className="signupImg1" width="30%" />
                <img src={signup_logo_2} className="signupImg2" width="30%" />
                <br /><br />

                <div className="reg_form">
                    <form onSubmit={sendData}>
                        <div>
                            <h1 className="signup">New Employee</h1>
                        </div>
                        <label for="fullname" className="signupheading">Full Name: </label><br />
                        <input type="text" className="signupforminput" placeholder="Full Name" onChange={(e) => {
                            setName(e.target.value);
                        }} required /><br />

                        <label for="fullname" className="signupheading">EmployeeID: </label><br />
                        <input type="text" className="signupforminput" placeholder="Full Name" onChange={(e) => {
                            setEmployeeID(e.target.value);
                        }} required /><br />

                        <label for="email" className="signupheading">Email: </label><br />
                        <input type="email" className="signupforminput" placeholder="Email" onChange={(e) => {
                            setEmail(e.target.value);
                        }} required /><br />

                        <label for="address" className="signupheading">Address: </label><br />
                        <input type="text" className="signupforminput" placeholder="Address" onChange={(e) => {
                            setAddress(e.target.value);
                        }} required /><br />

                        <label for="phonenumber" className="signupheading">Telephone Number: </label><br />
                        <input type="number" className="signupforminput" placeholder="Telephone Number" onChange={(e) => {
                            setPhone(e.target.value);
                        }} required /><br />

                        <label for="usertype" className="signupheading">User Type: </label><br />
                        <input type="radio" className="usertyperadio" name="usertype" value="Site Manager" onChange={(e) => {
                            setUserType(e.target.value);
                        }} required />&nbsp;&nbsp;
                        <label for="Registered User" className="signupheading">Site Manager</label>&nbsp;&nbsp;&nbsp;
                        <input type="radio" className="usertyperadio" name="usertype" value="Staff" onChange={(e) => {
                            setUserType(e.target.value);
                        }} required />&nbsp;&nbsp;
                        <label for="Registered User" className="signupheading">Staff</label>&nbsp;&nbsp;&nbsp;
                        <input type="radio" className="usertyperadio" name="usertype" value="Manager" onChange={(e) => {
                            setUserType(e.target.value);
                        }} required />&nbsp;&nbsp;
                        <label for="Registered User" className="signupheading">Manager</label>&nbsp;&nbsp;&nbsp;
                        <br />
                        <label for="gender" className="signupheading">Gender: </label><br />
                        <input type="radio" className="genderradio" name="gender" value="Male" onChange={(e) => {
                            setGender(e.target.value);
                        }} required />&nbsp;&nbsp;
                        <label for="Male" className="signupheading">Male</label>
                        &nbsp;&nbsp;&nbsp;
                        <input type="radio" className="genderradio" name="gender" value="Female" onChange={(e) => {
                            setGender(e.target.value);
                        }} required />&nbsp;&nbsp;
                        <label for="Female" className="signupheading">Female</label><br />

                        <label for="password" className="signupheading">Password: </label><br />
                        <input type="password" className="signupforminput" placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value);
                        }} required /><br />

                        <label for="password" className="signupheading">Confirm Password: </label><br />
                        <input type="password" className="signupforminput" placeholder="Confirm Password" onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }} required /><br /><br/><br/>

                        <input type="checkbox" className="signupcheckbox" required />&nbsp;&nbsp;
                        <label for="checkbox" className="signupheading">Accept Privacy Policy and Terms</label><br /><br />

                        <button type="submit" className="signupsubmit">SUBMIT</button>
                    </form>
                </div>
            </div>
            <br /><br /><br />
            <p className='FNFooterBottom' style={{ color: "black" }}>
                © 2023 MBKT Construction All Rights Reserved.
            </p>
            <ToastContainer />
        </div>
    )
}