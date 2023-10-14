import React from "react";
import "./adminFooter.css";
import FNfootericon from "../../../images/AdminFooter_img/footerpic.png";
import { useLocation } from "react-router-dom";

function Footer() {

    const location = useLocation()

    const hideFooter = location.pathname === '/' || location.pathname === '/login';

    if (hideFooter) {
        return null; // Render nothing if header should be hidden
    }

    return (
        <div className="FNFooterDiv">
            <footer className="FNExactFooter">
                <div>

                    <img src={FNfootericon} className="FNFooterPic"/>
                </div>
                <div className="FNFooterHeading">
                    <p>MBKT</p>
                </div>
                <div className="Footerlink">
                    <p className="FNFooterHead1" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/adminHome`;
                    }}>HOME</p>


                    <p className="FNFooterHead2" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/EyeTestMgmt`;
                    }}>REQUESTED ORDERS</p>

                    <p className="FNFooterHead3" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/GlaucomaForm`;
                    }}>APPROVED ORDERS</p>

                    <p className="FNFooterHead4" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/AppointmentMgmt`;
                    }}>PENDING ORDERS</p>

                    <p className="FNFooterHead5" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/addEmployees`;
                    }}>REJECTED ORDERS</p>
                </div>
                <div>
                    <hr className="FNHr"></hr>
                </div>
                <div className='footer-bottom'>
                    <p className='FNFooterBottom' style={{ color: "white" }}>
                        © 2023 OptiVision All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;