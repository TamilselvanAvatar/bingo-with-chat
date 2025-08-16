import { useEffect, useState } from 'react';
import './Mainpage.css'
import Div from '../helperComponent/Div';
import { fetchUser } from '../services/fetchUser';
import { ERROR_CODE } from '../../helper/generalConstants';

export default () => {
    const [userData, loading, error, getToken] = fetchUser();
    const [invalid, setInvalid] = useState({ userName: false, password: false })
    const [loginInfo, setLoginInfo] = useState({ userName: '', password: '' })

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

    const onLoginSubmit = (e) => {
        e.preventDefault();
        getToken(loginInfo);
    }

    return (
        <form onSubmit={onLoginSubmit} className='form-container'>
            <Div If={invalid.password || invalid.userName} className='error'>User Name or Password is invalid</Div>
            <div className={`input-group ${invalid.userName ? 'error-input' : ''}`}  >
                <input required placeholder='Enter the User Name' type='text' onChange={e => { setLoginInfo(pre => ({ ...pre, userName: e.target.value })) }} />
            </div>
            <div className={`input-group ${invalid.password ? 'error-input' : ''}`}>
                <input required placeholder='Enter the Password' type='password' onChange={e => { setLoginInfo(pre => ({ ...pre, password: e.target.value })) }} />
            </div>
            <button className='button'>Login</button>
            <Div If={invalid.password || invalid.userName}><a>Forgot Password</a></Div>
        </form>
    );
}