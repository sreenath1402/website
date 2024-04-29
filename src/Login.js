import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import loginData from './login_data.json'; // Import JSON data

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = loginData.find((user) => user.email === username && user.password === password);

    if (user) {
      localStorage.setItem('userToken', user.email);
      navigate('/home');
    } else {
       setError('User does not exist');
    }  
    
  };

  return (
    <>
      <div className='login_background'>
        <br /> <br/>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '300px', margin: '0 auto' ,outlineStyle:'solid', outlineColor:'#156669', opacity:'0.9' }}>
          <h2 style={{ textAlign: 'center' }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ margin: '10px auto', textAlign: 'center' }}>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
                placeholder="Enter your username"
              />
            </div>
            <div style={{ margin: '10px auto', textAlign: 'center' }}>
              <br />
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
                placeholder="Enter your password"
              />
            </div>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            <div style={{ margin: '20px auto', textAlign: 'center' }}>
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
              <div style={{ marginTop: '10px', fontSize: '14px' }}>
                <Link to="/forgot-password" style={{ color: 'blue' }}>Forgot Password?</Link>
              </div>
              <div style={{ marginTop: '10px', fontSize: '14px' }}>
                Don't have an account? <Link to="/register" style={{ color: 'blue' }}>Sign-up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
