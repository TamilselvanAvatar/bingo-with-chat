import { useState } from "react";
import './Mainpage.css';
import Div from '../components/Div.jsx'
import Image from '../images/bg1.jpg';
import Register from './Register.jsx';
import Login from "./Login.jsx";

function Welcome() {
    var [clicked, setClicked] = useState({ isLogin: false, isRegister: false });
    return (
        <div className="full-screen">
            <div className="right-side">
                <div className="button-group">
                    <h1>Hello,</h1>
                    <Div If={!clicked.isLogin && !clicked.isRegister} className='button-group'>
                        <button className="auth-button" onClick={() => { setClicked(pre => ({ ...pre, isLogin: true })) }}>Login</button>
                        <button className="auth-button" onClick={() => { setClicked(pre => ({ ...pre, isRegister: true })) }}>Register</button>
                    </Div>
                    <Div If={clicked.isRegister}>
                        <Register />
                    </Div>
                    <Div If={clicked.isLogin}>
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