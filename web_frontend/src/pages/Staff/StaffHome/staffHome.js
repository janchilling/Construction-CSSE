import React from "react";
import { useLocation, useParams } from "react-router-dom";
import '../StaffHome/staffHome.css';
import dashboardpic from '../../../images/ManagementHome_img/DashboardPic.png';
import cataract from '../../../images/StaffHome_img/cataract.png';
import appointment from '../../../images/StaffHome_img/appointment.png';
import glaucoma from '../../../images/StaffHome_img/glaucoma.png';
import recovery from '../../../images/StaffHome_img/recovery.png';
import patientpic from '../../../images/StaffHome_img/patient1.jpg';

export default function StaffHome() {

    const location = useLocation()
    const params = useParams();

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    return (
        <div className="PatientHomePage">
            <br />
            <h1 className="PatientHomeHeading">Welcome to Staff Services <br/> of MBKT construction</h1>

            <p className="PHPara1">Our motivation is to separate ourseleves as a medical procedure that give far-reaching ophthalmology.</p>

            <img src={dashboardpic} className="PHDashBoardPic" />
            <br /><br />
            <p className="PHPara2">We always thrive to provide you the best services for all your visual needs!</p>
            <p className="PHPara3">Our services are mentioned below</p>

            <div className="PatientHomePageSecondPart">
                <br />
                <div className="PatientDiv1">
                    <img src={cataract} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Requested Orders</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/requestedOrders`;
                    }}>Requested Orders</button>

                </div>

                <div className="PatientDiv2">
                    <img src={appointment} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Approved Orders</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/approvedOrders`;
                    }}>Approved Orders</button>

                </div>

                <div className="PatientDiv3">
                    <img src={glaucoma} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Pending Orders</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/pendingOrders`;
                    }}>Pending Orders</button>

                </div>

                <div className="PatientDiv4">
                    <img src={recovery} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Rejected Orders</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/rejectedOrders`;
                    }}>Rejected Orders</button>

                </div>
                <br />
            </div>

            <div className="PatientHomePageThirdPart">
                <img src={patientpic} className="PHDashBoardPic2" />
                <div className="ph3div">
                    <h2 className="PatientHomeHeading2"> Find OptiVision at;</h2>
                    <p className="PH3Para"> 🚩123/A, <br /> Sir Manula Gunatilleke Av, <br /> Manugama. <br /></p>
                    <p className="PH3Para"> ☎ Telephone: </p>
                    <p className="PH3Para2">+9411-2375843 / +9411-57584543</p>
                    <p className="PH3Para"> @ Email: </p>
                    <p className="PH3Para2">contact@optivision.lk</p>
                </div>

                <br />
            </div>
            <br /><br />
        </div>
    )
}
