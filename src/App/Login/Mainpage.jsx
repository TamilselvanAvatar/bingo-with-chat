import { useState } from "react";
import './Mainpage.css';
import Image from '../images/bg1.jpg';
import Register from './Register.jsx';

function Welcome(props) {
    var [isVisible, setIsVisible] = useState(true);

    const handleChange = () => {
        setIsVisible(false);
    }
    return (
        <div className="full-screen">
            <div className="right-side">
                <div className="button-group">
                    <h1>Hello,</h1>
                    {isVisible && (
                        <div className="button-group">
                            <button className="auth-button">Login</button>
                            <button className="auth-button" onClick={handleChange}>Register</button>
                            <button className="auth-button color-check1">Register</button>
                            <button className="auth-button color-check2">Register</button>
                            <button className="auth-button color-check3">Register</button>
                            <button className="auth-button color-check4">Register</button>
                        </div>)}
                    {!isVisible && ( <Register />)}
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