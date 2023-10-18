import React, { useContext } from 'react';
import './adminHeader.css';
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../ContextComponents/ContextComponents.js";

export default function Header() {

    const location = useLocation()
    const Navigate = useNavigate();

    const { user, setUser } = useContext(UserContext)

    const hideHeader = location.pathname === '/' || location.pathname === '/login';

    if (hideHeader) {
        return null; // Render nothing if header should be hidden
    }

    //Log out function
    function logOut() {
        localStorage.clear(); // Clear all local storage data
        setUser(null); // Clear user context data
        Navigate('/login'); // Redirect to the login page
    }

    //Home pages Control
    const HomepagesHandle = async () => {

        if (user.UserType === "Manager") {
            Navigate('/managerHome');
        }
        else if (user.UserType === "Staff") {
            Navigate('/staffHome');
        }
    }
    //Pending Orders Control
    const PendingOrdersHandle = async () => {

        if (user.UserType === "Manager") {
            Navigate('/ManagementpendingOrders');
        }
        else if (user.UserType === "Staff") {
            Navigate('/pendingOrders');
        }
    }

    console.log(user)

    return (
        <>
            <div className='NavigationBarB'>
                <nav className="NavigationBarB navbar navbar-expand-lg bg-body-tertiary">
                    <div className="NavigationBarB container-fluid" id='PatientNavbar'>
                        <a className="NavigationBarB navbar-brand" id='PatientNavHeading' onClick={HomepagesHandle}>MBKT</a>
                        <button className="NavigationBarB navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="NavigationBarB navbar-toggler-icon"></span>
                        </button>
                        <div className="NavigationBarB collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="NavigationBarB navbar-nav" id='PatientNav'>
                                <li className="NavigationBarB nav-item" id="PatientNavitem">
                                    <a className="NavigationBarB nav-link" id="PatientHeaderHd" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/requestedOrders`
                                    }}>REQUESTED ORDERS</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" id="PatientHeaderHd" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/approvedOrders`
                                    }}>APPROVED ORDERS</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" id="PatientHeaderHd" style={{ color: "#ffffff" }} onClick={PendingOrdersHandle}>PENDING ORDERS</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" id="PatientHeaderHd" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/rejectedOrders`
                                    }}>REJECTED ORDERS</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" id="PatientHeaderHd" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `#`
                                    }}>HELP DETAILS</a>
                                </li>

                                <li className='Patientdropdown' >
                                    <div className="NavigationBarBarDropdown dropdown">
                                        <button className="NavigationBarB btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            COMPANY STAFF
                                        </button>

                                        <ul className="NavigationBarB dropdown-menu dropdown-menu-dark">
                                            <li><a className="NavigationBarB dropdown-item" onClick={logOut}>Log out</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}

