import React, { useState, useEffect } from 'react';

const UpdateInfo = () => {
  const [userData, setUserData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setUserData([storedData]);
    }
  }, []);
  
  const handleEdit = (index) => {
    setEditingIndex(index);
    setUpdatedData(userData[index]);
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  
  const handleSave = (index) => {
    const updatedUserData = [...userData];
    updatedUserData[index] = updatedData;
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setEditingIndex(-1);
  };

  return (
    <>
    <div className='update_background'>

    <br></br>
<div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '1000px', alignSelf: 'center',outlineStyle:'solid', outlineColor:'#156669', margin: '0 auto'}} >
      <h2 style={{ textAlign: 'center' }}> Update Information</h2>
      <table border='1px' align='center' style={{borderCollapse: "collapse", width: '1000px'}}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Email Address</th>
            <th>Login Name</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{index === editingIndex ? <input type="text" name="firstName" value={updatedData.firstName} onChange={handleInputChange} /> : user.firstName}</td>
              <td>{index === editingIndex ? <input type="text" name="lastName" value={updatedData.lastName} onChange={handleInputChange} /> : user.lastName}</td>
              <td>{index === editingIndex ? <input type="text" name="address" value={updatedData.address} onChange={handleInputChange} /> : user.address}</td>
              <td>{index === editingIndex ? <input type="text" name="city" value={updatedData.city} onChange={handleInputChange} /> : user.city}</td>
              <td>{index === editingIndex ? <input type="text" name="state" value={updatedData.state} onChange={handleInputChange} /> : user.state}</td>
              <td>{index === editingIndex ? <input type="text" name="zipCode" value={updatedData.zipCode} onChange={handleInputChange} /> : user.zipCode}</td>
              <td>{index === editingIndex ? <input type="text" name="email" value={updatedData.email} onChange={handleInputChange} /> : user.email}</td>
              <td>{index === editingIndex ? <input type="text" name="username" value={updatedData.username} onChange={handleInputChange} /> : user.username}</td>
              <td>{index === editingIndex ? <input type="text" name="password" value={updatedData.password} onChange={handleInputChange} /> : user.password}</td>
              <td style={{textAlign: "center"}}>
                {index === editingIndex ? (
                  <button  onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    </>
   
  );
};

export default UpdateInfo;
