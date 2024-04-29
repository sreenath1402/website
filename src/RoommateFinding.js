import React, { useState, useEffect } from 'react';

const RoommateFinding = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        moveInDate: '',
        gender: '',
        approximatePrice: ''
    });
    const [roommateData, setRoommateData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch('/roommate_data.json')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Output the retrieved data to the console
                setRoommateData(data); // Set the retrieved data in state
            })
            .catch(error => console.error('Error fetching roommate data:', error));
    }, []);

    useEffect(() => {
        if (searchCriteria.moveInDate === '' || searchCriteria.gender === '') {
            return; // If search criteria is not complete, do not search
        }

        const results = roommateData.filter(roommate =>
            roommate.moveInDate === searchCriteria.moveInDate &&
            roommate.gender === searchCriteria.gender
        );
        setSearchResults(results);
    }, [searchCriteria, roommateData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchCriteria({
            ...searchCriteria,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Search for roommates based on search criteria
        // Display search results
    };

    return (
        <>
        <div className='roommate_background'>
            <br/>
            <div style={{ backgroundColor: '#FFBD59' , padding: '20px', borderRadius: '10px', width: '400px', margin: '0 auto'  }}>
            <h2 style={{textAlign: 'center'}}>Roommate Finding</h2>
            <form onSubmit={handleSubmit}>
                <label>Move-in Date:</label>
                <input type="date" name="moveInDate" value={searchCriteria.moveInDate} onChange={handleInputChange} required
                 style={{
                    padding: '10px',
                    borderRadius: '5px',
                    width: '100%',
                    boxSizing: 'border-box',
                    borderColor: 'chocolate',
                    outline: 'none'
                }} />
                <label>Gender:</label>
                <select name="gender" value={searchCriteria.gender} onChange={handleInputChange} required style={{
                    padding: '10px',
                    borderRadius: '5px',
                    width: '100%',
                    boxSizing: 'border-box',
                    borderColor: 'chocolate',
                    outline: 'none'
                }} >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button type="submit" style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        marginTop: '10px',
                        marginLeft: '150px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}>Search</button>
            </form>
            <h3>Search Results</h3>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map(roommate => (
                        <li key={roommate.id}>
                            <p>Name: {roommate.name}</p>
                            <p>Move-in Date: {roommate.moveInDate}</p>
                            <p>Gender: {roommate.gender}</p>
                            <p>Approximate Price: ${roommate.approximatePrice}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No roommates found matching the search criteria.</p>
            )}
        </div>
            
        </div>


        
        </>
       
    );
}

export default RoommateFinding;
