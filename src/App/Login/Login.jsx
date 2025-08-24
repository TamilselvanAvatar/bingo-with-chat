import { useContext, useEffect, useState } from 'react';
import './Mainpage.css'
import Div from '../components/Div';
import { fetchUser } from '../services/UserService';
import { ERROR_CODE } from '../../helper/generalConstants';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import Dashboard from '../Dashboard/dashboard';

export default () => {
    const [userData, loading, error, getToken] = fetchUser();
    const [invalid, setInvalid] = useState({ userName: false, password: false })
    const [loginInfo, setLoginInfo] = useState({ userName: '', password: '' })
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            if (error.code == ERROR_CODE.INVALID_USER_NAME) {
                setInvalid(pre => ({ ...pre, userName: true }))
            }
            if (error.code == ERROR_CODE.INVALID_PASSWORD) {
                setInvalid(pre => ({ ...pre, password: true }))
            }
        }
    }, [error])

    useEffect(() => {
        if (!loading && userData?.token) {
            login(userData)
            navigate(`/dashboard/${userData.USER_ID}`)
        }
    }, [loading, userData])

    const onLoginSubmit = (e) => {
        e.preventDefault();
        getToken(loginInfo);
    }

    return (
        <form onSubmit={onLoginSubmit} className='form-container'>
            <Div If={invalid.password || invalid.userName} className='error'>User Name or Password is invalid</Div>
            <div className={`input-group ${invalid.userName ? 'error-input' : ''}`}  >
                <input required placeholder='Enter the User Name Or Email' type='text' onChange={e => { setLoginInfo(pre => ({ ...pre, userName: e.target.value })) }} />
            </div>
            <div className={`input-group ${invalid.password ? 'error-input' : ''}`}>
                <input required placeholder='Enter the Password' type='password' onChange={e => { setLoginInfo(pre => ({ ...pre, password: e.target.value })) }} />
            </div>
            <button className='button'>Login</button>
            <Div If={invalid.password || invalid.userName}><a>Forgot Password</a></Div>
        </form>
    );
}