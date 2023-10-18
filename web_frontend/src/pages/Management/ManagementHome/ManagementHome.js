import React from "react";
import { useLocation, useParams } from "react-router-dom";
import '../ManagementHome/ManagementHome.css';
import dashboardpic from '../../../images/ManagementHome_img/DashboardPic.png';
import usericon from '../../../images/ManagementHome_img/usericon.png';
import Empicon from '../../../images/ManagementHome_img/Empicon.png';
import ordericon from '../../../images/ManagementHome_img/ordericon.png';
import moneyicon from '../../../images/ManagementHome_img/moneyicon.png';
import mgtdown from '../../../images/ManagementHome_img/mgtdown.jpg';

export default function ManagementHome() {

    const location = useLocation()
    const params = useParams();

    return (
        <div className="PatientHomePage">
            <br />
            <h1 className="PatientHomeHeading">Welcome to Management <br/>of MBKT construction</h1>

            <p className="PHPara1">Our motivation is to be the top organization in the construction industry providing excellent service to the people.</p>

            <img src={dashboardpic} alt="mgtdashboard" className="PHDashBoardPic" />
            <br /><br /><br/>
            <p className="PHPara2">We are always committed to providing you with the best services for all your construction needs!</p>
            <p className="PHPara3">Our services are mentioned below</p>

            <div className="PatientHomePageSecondPart">
                <br />
                <div className="PatientDiv1">
                    <img src={usericon} alt="usericon" className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Add Employees</h2>
                    <p className="PatientDivPara">All Managers can add new Site manager, Staff and other manager to the system using this button.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/addEmployees`;
                    }}>Add Employee</button>

                </div>

                <div className="PatientDiv2">
                    <img src={Empicon} alt="empicon" className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Employee Details</h2>
                    <p className="PatientDivPara">All Managers can view, update and delete all employees in their company using this button.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/allEmployees`;
                    }}>Employee Details</button>

                </div>

                <div className="PatientDiv3">
                    <img src={ordericon} alt="ordericon" className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Orders</h2>
                    <p className="PatientDivPara">All managers can send an order to the supplier to purchase an approved order using this button.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/orders`;
                    }}>Orders</button>

                </div>

                <div className="PatientDiv4">
                    <img src={moneyicon} alt="moneyicon" className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Allocated Budgets</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/allocatedBudgets`;
                    }}>Allocated Budgets</button>

                </div>
                <br />
            </div>

            <div className="PatientHomePageThirdPart">
                <img src={mgtdown} alt="mgtdown" className="PHDashBoardPic2" />
                <div className="ph3div">
                    <h2 className="PatientHomeHeading2"> Find Construction at;</h2>
                    <p className="PH3Para"> 🚩123/A, <br /> Sir Manula Gunatilleke Av, <br /> Manugama. <br /></p>
                    <p className="PH3Para"> ☎ Telephone: </p>
                    <p className="PH3Para2">+9411-2375843 / +9411-57584543</p>
                    <p className="PH3Para"> @ Email: </p>
                    <p className="PH3Para2">contact@MBKT-Construction.lk</p>
                </div>

                <br />
            </div>
            <br /><br />
        </div>
    )
}