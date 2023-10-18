import React, { useContext } from "react";
import "./adminFooter.css";
import FNfootericon from "../../../images/ManagementFooter_img/footerpic.png";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../ContextComponents/ContextComponents.js";

function Footer() {

    const location = useLocation()
    const Navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)

    const hideFooter = location.pathname === '/' || location.pathname === '/login';

    if (hideFooter) {
        return null; // Render nothing if header should be hidden
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

    return (
        <div className="FNFooterDiv">
            <footer className="FNExactFooter">
                <div>

                    <img src={FNfootericon} alt="footericon" className="FNFooterPic" onClick={HomepagesHandle}/>
                </div>
                <div className="FNFooterHeading">
                    <p onClick={HomepagesHandle}>MBKT</p>
                </div>
                <div className="Footerlink">
                    <p className="FNFooterHead1" onClick={HomepagesHandle}>HOME</p>


                    <p className="FNFooterHead2" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/requestedOrders`;
                    }}>REQUESTED ORDERS</p>

                    <p className="FNFooterHead3" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/approvedOrders`;
                    }}>APPROVED ORDERS</p>

                    <p className="FNFooterHead4" onClick={PendingOrdersHandle}>PENDING ORDERS</p>

                    <p className="FNFooterHead5" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/rejectedOrders`;
                    }}>REJECTED ORDERS</p>
                </div>
                <div>
                    <hr className="FNHr"></hr>
                </div>
                <div className='footer-bottom'>
                    <p className='FNFooterBottom' style={{ color: "white" }}>
                        © 2023 MBKT Construction All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;