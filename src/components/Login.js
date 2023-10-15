import axios from '../axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


function LoginPage() {
  const navigate = useNavigate();
  localStorage.setItem('loginUserId', "");

  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    try {
      console.log("called");
      e.preventDefault();
      const apiUrl = "/api/checkUser";
      axios.post(apiUrl, formData)
        .then((response) => {

          console.log("response>> ", response);
          if (response.data.status == 200) {
            localStorage.setItem('loginUserId', response.data.result[0]._id);

            navigate('/productCard');
          }
          else {
            alert('Login failed. Please check your credentials.');
          }
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }

  };



  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="user_password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
