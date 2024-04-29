import React, { useState, useEffect } from 'react';
import './Activities.css';
const PeopleSearching = () => {
    const [studentData, setStudentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch('/student_data.json')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Output the retrieved data to the console
                setStudentData(data); // Set the retrieved data in state
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setSearchResults([]);
            return;
        }

        const results = studentData.filter(student =>
            student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.Department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student["Phone Number"].includes(searchTerm) ||
            student.Email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, studentData]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
        <div className='people_background '>
        <br></br>
        
        <div style={{ backgroundColor: '#CFB79E', padding: '20px', borderRadius: '10px', width: '500px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Search here for People</h2>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by Name, Department, Phone Number, or Email"
                value={searchTerm}
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
                onChange={handleSearchChange}
            />

            {/* Display search results only when searchTerm is not empty */}
            {searchTerm !== '' && searchResults.map(student => (
                <div key={student.Email}>
                    <p>Name - {student.Name}</p>
                    <p>Dept - {student.Department}</p>
                    <p>Ph No - {student["Phone Number"]}</p>
                    <p>Email - {student.Email}</p>
                    <hr/>
                </div>
            ))}
        </div>
        
        </div>
        
        </>

    );
}

export default PeopleSearching;
