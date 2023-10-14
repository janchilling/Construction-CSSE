import React from "react";
import '../Index/index.css';
import indexpic2 from '../../images/Index_img/indexpic2.jpg';
import logo from '../../images/Index_img/logo.png';

export default function Index() {
    return (
        <div className="index_bg">
            <div>
                <h1 className="name">OptiVision</h1>
            </div>
            <br/>
            <div className="IndexSecondDiv">
                <div className="IndexPicDiv">
                    <img src={indexpic2} className="indexpic" />
                </div>
                <div className="IndexPicPara">
                    <img src={logo} className="logoIndex" />
                    <div className="he1">
                        <p>Eye Care Services For You</p>
                    </div>
                    <div className="he2">
                        <p>"Give Your Vision The Treatment It Deserves"</p>
                    </div>
                    <div className="he3">
                        <p onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/`;
                        }}>www.OptiVision.lk</p>
                    </div>
                </div>
            </div>
            <br /><br />
            <button className="IndexBtn" onClick={(e) => {
                e.preventDefault();
                window.location.href = `/login`;
            }}>LOGIN</button> 
            <br /><br/>
            <p className='FNFooterBottom' style={{ color: "black" }}>
                © 2023 OptiVision All Rights Reserved.
            </p>

        </div>
    )
}

//check