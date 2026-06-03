import React from "react";
import "../App.css"
import {Link} from "react-router-dom";
export default function LandingPage(){
    return (
        <div className="landingPageContainer">

            <nav>
                <div className="navHeader">
                    <h2>Apna Video Call</h2>
                </div>
                <div className="navList">                
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role="button">
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color: "#FF9839"}}> Connect </span><span>with your loved ones</span></h1>
                    <p>Conver a distance by apna videoCall</p>
                    <div role="button">
                        <Link to="{/home}">Get started</Link>
                    </div>
                </div>
                <div>
                    <img src="../mobile.png" alt="ahh!!" />
                </div>
            </div>

        </div>
    )
}