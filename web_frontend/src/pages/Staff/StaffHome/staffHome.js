import React from "react";
import { useLocation, useParams } from "react-router-dom";
import '../StaffHome/staffHome.css';
import dashboardpic from '../../../images/ManagementHome_img/DashboardPic.png';
import Request from '../../../images/StaffHome_img/Requesticon.png';
import Approve from '../../../images/StaffHome_img/approveicon.png';
import Pending from '../../../images/StaffHome_img/pendingicon.png';
import Rejected from '../../../images/StaffHome_img/Rejectedicon.png';
import stficon from '../../../images/StaffHome_img/stficon.jpg';

export default function StaffHome() {

    const location = useLocation()
    const params = useParams();

    return (
        <div className="PatientHomePage">
            <br />
            <h1 className="PatientHomeHeading">Welcome to Staff Services <br/> of MBKT construction</h1>

            <p className="PHPara1">Our motivation is to be the top organization in the construction industry providing excellent service to the people.</p>

            <img src={dashboardpic} className="PHDashBoardPic" />
            <br /><br /><br/>
            <p className="PHPara2">We are always committed to providing you with the best services for all your construction needs!</p>
            <p className="PHPara3">Our services are mentioned below</p>

            <div className="PatientHomePageSecondPart">
                <br />
                <div className="PatientDiv1">
                    <img src={Request} className="PatientDivIconS" />
                    <h2 className="PatientDivHeading">Requested Orders</h2>
                    <p className="PatientDivParaS">All Procument Staff can view Requested Orders in this button.</p><br/>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/requestedOrders`;
                    }}>Requested Orders</button>

                </div>

                <div className="PatientDiv2">
                    <img src={Approve} className="PatientDivIconS" />
                    <h2 className="PatientDivHeading">Approved Orders</h2>
                    <p className="PatientDivPara">All Procument Staff can view approved orders in this button.</p><br/>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/approvedOrders`;
                    }}>Approved Orders</button>

                </div>

                <div className="PatientDiv3">
                    <img src={Pending} className="PatientDivIconS" />
                    <h2 className="PatientDivHeading">Pending Orders</h2>
                    <p className="PatientDivPara">All Procument Staff can view pending orders in this button.</p><br/>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/pendingOrders`;
                    }}>Pending Orders</button>

                </div>

                <div className="PatientDiv4">
                    <img src={Rejected} className="PatientDivIconS" />
                    <h2 className="PatientDivHeading">Rejected Orders</h2>
                    <p className="PatientDivPara">All Procument Staff can view Rejected orders in this button.</p><br/>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/rejectedOrders`;
                    }}>Rejected Orders</button>

                </div>
                <br />
            </div>

            <div className="PatientHomePageThirdPart">
                <img src={stficon} className="PHDashBoardPic2" />
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
