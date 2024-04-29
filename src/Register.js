import React, { useState } from 'react';
import { Link} from 'react-router-dom'; // Import Link component


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation
    const errors = {};
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Save data to local storage
      const userData = {
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        email,
        username,
        password,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('Form submitted successfully!');
      alert('Registered successfully!');
      console.log('Form submitted successfully!');
      // Optionally, you can redirect the user or show a success message here
    }
  };

  return (
    <>
    <div className='register_background'>

    <br/>
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '500px',outlineStyle:'solid', outlineColor:'#156669', margin: '0 auto'}}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div align="center" margin="2px" style={{ margin: '10px auto', textAlign: 'center' }} >
          <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} 
          style={{ padding: '10px', borderRadius: '5px',  boxSizing: 'border-box' }} />
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange}
           style={{ padding: '10px', borderRadius: '5px',   boxSizing: 'border-box' }} /> 

        </div>
        <br />
        <div style={{ margin: '10px auto', textAlign: 'center' }}>
          <input type="text" placeholder="Address" value={address} onChange={handleAddressChange} 
          style={{ padding: '10px', borderRadius: '5px',  boxSizing: 'border-box' }} />
               &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" placeholder="City" value={city} onChange={handleCityChange}
          style={{ padding: '10px', borderRadius: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <br />
        <div style={{ margin: '10px auto', textAlign: 'center' }}>
          <input type="text" placeholder="State" value={state} onChange={handleStateChange}
          style={{ padding: '10px', borderRadius: '5px',  boxSizing: 'border-box' }}
          />
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" placeholder="Zip Code" value={zipCode} onChange={handleZipCodeChange}
          style={{ padding: '10px', borderRadius: '5px',  boxSizing: 'border-box' }}
          />
        </div>
        <br />
        <div style={{ margin: '10px auto', textAlign: 'center' }}>
          <input type="text" placeholder="Email Address" value={email} onChange={handleEmailChange} 
          style={{ padding: '10px', borderRadius: '5px',   boxSizing: 'border-box' }}
          />
             &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
         <input type="text" placeholder="Login Name" value={username} onChange={handleUsernameChange}
          style={{ padding: '10px', borderRadius: '5px',   boxSizing: 'border-box' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <br />
        <div style={{ margin: '10px auto', textAlign: 'center' }}>
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}
          style={{ padding: '10px', borderRadius: '5px',   boxSizing: 'border-box' }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
         <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange}
          style={{ padding: '10px', borderRadius: '5px',  boxSizing: 'border-box' }}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </div>
        <br />
        <div style={{ margin: '20px auto', textAlign: 'center' }}>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Register</button>
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            Already have an account? <Link to="/" style={{ color: 'blue' }}>Login</Link>
          </div>
        </div>
      </form>
    </div>
    </div>
   
    </>

  );
};

export default Register;
