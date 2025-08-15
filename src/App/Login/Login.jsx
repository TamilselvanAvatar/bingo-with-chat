import { useEffect, useState } from 'react';
import './Mainpage.css'
import Div from '../helperComponent/Div';

export default () => {
    const [loginSubmited, setLoginSubmitted] = useState(false);
    const [invalid, setInvalid] = useState({ userName: false, password: false })
    const [loginInfo, setLoginInfo] = useState({ userName: '', password: '' })
    useEffect(() => {
        console.log(loginInfo)
    }, [loginSubmited])

    const onLoginSubmit = (e) => {
        e.preventDefault();
        setLoginSubmitted(true);
        setInvalid(pre => ({ ...pre, userName: true }))
    }

    return (
        <form onSubmit={onLoginSubmit} className='form-container'>
            <Div If={invalid.password || invalid.userName} className='error'>User Name or Password is invalid</Div>
            <div className='input-group'  >
                <input required placeholder='Enter the User Name' type='text' onChange={e => { setLoginInfo(pre => ({ ...pre, userName: e.target.value })) }} />
            </div>
            <div className='input-group'>
                <input required placeholder='Enter the Password' type='password' onChange={e => { setLoginInfo(pre => ({ ...pre, password: e.target.value })) }} />
            </div>
            <button className='button'>Login</button>
            <Div If={invalid.password || invalid.userName}><a>Forgot Password</a></Div>
        </form>
    );
}