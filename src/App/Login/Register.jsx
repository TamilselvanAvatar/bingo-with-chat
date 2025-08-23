import React, { useState } from 'react';
import './Mainpage.css';
import axios from 'axios'
import {ERR_RESPONSE} from '../helperComponent/constant';
function UserForm() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState({ error: false, apiError: false })
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const setConfirm = (e) => {
    setConfirmPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === confirmPassword) {
      setError({error : false});
      const registerCall = axios.post(`http://localhost:9000/bingo/user/register`, formData)
      registerCall.then(res => {
        var data = res;
      }).catch(err => {
        if(err.response.data.code === ERR_RESPONSE.USER_ALREADY_EXIST)
          setError({apiError: true});
      })
    } else {
      setError({error : true});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error.apiError && <div className='error'>User Already Exists</div>}
      <div className="input-group">
        <label htmlFor="userName">Username</label>
        <input type="text" id="userName" name="userName"
          value={formData.userName} onChange={handleChange} placeholder="Enter your username" required />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email}
          onChange={handleChange} placeholder="Enter your email" required />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password}
          onChange={handleChange} placeholder="Enter your password" required />
      </div>
      {error.error && <div className='error'>Confirm Password does not match</div>}
      <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword"
          onChange={setConfirm} placeholder="Confirm password" required />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
