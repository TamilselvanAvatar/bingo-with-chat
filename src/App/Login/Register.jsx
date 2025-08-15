import React, { useState } from 'react';
import './Mainpage.css';
function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add form validation or API calls here
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"
          value={formData.username} onChange={handleChange} placeholder="Enter your username" required/>
        </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email}
          onChange={handleChange} placeholder="Enter your email" required />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
