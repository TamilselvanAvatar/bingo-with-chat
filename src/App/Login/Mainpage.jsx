import { useState } from "react";
import './Mainpage.css';
import Div from '../helperComponent/Div'
import Image from '../images/bg1.jpg';
import Register from './Register.jsx';
import Login from "../Login";

function Welcome() {
    var [clicked, setClicked] = useState({ isLoginClicked: false, isRegisterClicked: false });
    return (
        <div className="full-screen">
            <div className="right-side">
                <div className="button-group">
                    <h1>Hello,</h1>
                    <Div If={!clicked.isLoginClicked && !clicked.isRegisterClicked} className='button-group'>
                        <button className="auth-button" onClick={() => { setClicked(pre => ({ ...pre, isLoginClicked: true })) }}>Login</button>
                        <button className="auth-button" onClick={() => { setClicked(pre => ({ ...pre, isRegisterClicked: true })) }}>Register</button>
                    </Div>
                    <Div If={clicked.isRegisterClicked}>
                        <Register />
                    </Div>
                    <Div If={clicked.isLoginClicked}>
                        <Login />
                    </Div>
                </div>
            </div>
            <div className="left-side">
                <img
                    src={Image}
                    alt="Welcome"
                    className="welcome-image"
                />
            </div>
        </div >
    )
}

export default Welcome;