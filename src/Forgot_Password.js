import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleReset = () => {
    handleSubmit();
  };

  const handleCancel = () => {
    // Add logic to navigate back to the login page or any other appropriate action
  };

  const handleSubmit = () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const user = storedData.find(user => user.email === email);
    if (user) {
      // Send reset password link to the user's email (You need backend logic for this)
      setMessage('Password reset link has been sent to your email.');
    } else {
      setMessage('Email not found.');
    }
  };

  return (
    <>
    <div className='forgot_background'>

    <br />
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '300px',outlineStyle:'solid', outlineColor:'#156669', margin: '0 auto'}}>
      <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
      <form>
        <div style={{ margin: '10px auto', textAlign: 'center' }}>
          <label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter your email'
              style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
            />
          </label>
        </div>
        <div style={{ margin: '20px auto', textAlign: 'center' }}> 
          <button type="button" onClick={handleReset} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Reset</button>
          <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'grey', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>Cancel</button>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
      Remember your password? <Link to="/" style={{ color: 'blue' }}>Login here</Link>
    </div>
      </form>
      {message && <p style={{ textAlign: 'center' }}>{message}</p>}
    </div>
    </div>
   
 
    </>
  );
};

export default ForgotPassword;
