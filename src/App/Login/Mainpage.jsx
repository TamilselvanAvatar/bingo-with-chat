import { useState } from "react";
import './Mainpage.css';
import Image from '../images/bg1.jpg';

function Welcome(props) {
    return (
        <div className="full-screen">
            <div className="right-side">
                <div className="button-group">
                    <h1>Hello, {props.name}</h1>
                    <button className="auth-button">Login</button>
                    <button className="auth-button">Register</button>
                    <button className="auth-button color-check1">Register</button>
                    <button className="auth-button color-check2">Register</button>
                    <button className="auth-button color-check3">Register</button>
                    <button className="auth-button color-check4">Register</button>
                </div>
            </div>
            <div className="left-side">
                <img 
                    src={Image}
                    alt="Welcome" 
                    className="welcome-image" 
                />
            </div>
        </div>
    )
}

export default Welcome;