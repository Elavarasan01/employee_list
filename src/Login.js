import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate =useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://carxier-dev.tahrtech.in/api/v1/auth/signin/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(corsProxyUrl+apiUrl, {
        email: email,
        password: password
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        const token=response.data.token;
        localStorage.setItem('token', token);
        setError('');
        navigate('/employeelist');
      } else {
        setError('User not validated');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-form">
      <h2 style={{ color: "lightgray" }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder='Email'
          />
        </div>
        <div className="form-group">
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder='Password'
            />
          </div>
        </div>
        <button type="submit">Login</button><br />
        {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}<br/>
        <span style={{color:"gray",fontSize:"10px"}}>By proceeding,you agree to Terms and privacy</span>
      </form>
    </div>
  );
};

export default LoginForm;