import React, { useState } from 'react';

const ScheduledActivities = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [activities, setActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Fetch activities from the server within the specified period
        // For now, let's assume activities are already fetched and stored in a state variable
        // Display activities within the specified period
        // For simplicity, let's assume activities are fetched from a JSON file
        fetch('/scheduled_activities.json')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Output the retrieved data to the console
                const filteredActivities = data.filter(activity => activity.date >= startDate && activity.date <= endDate);
                setActivities(filteredActivities); // Set the filtered activities in state
            })
            .catch(error => console.error('Error fetching scheduled activities:', error));
    };

    const handleActivitySelect = (activityId) => {
        const selectedActivity = activities.find(activity => activity.id === activityId);
        setSelectedActivities([...selectedActivities, selectedActivity]);
    };

    return (
        <>
        <div className='sports_background'>
            <br/>
            <div style={{ backgroundColor: '#59997A', padding: '20px', borderRadius: '10px', width: '400px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>Scheduled Activities</h2>
            <form onSubmit={handleSubmit}>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={handleStartDateChange} required  
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }}/>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={handleEndDateChange} required
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }} />
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px',marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Search</button>
            </form>

            {/* Display activities */}
            <h3>Activities</h3>
            {activities.length > 0 ? (
                <div>
                    {activities.map(activity => (
                        <div key={activity.id}>
                            <p>{activity.name} - {activity.date}</p>
                            <button style={{ padding: '10px 20px', borderRadius: '5px',marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
                             onClick={() => handleActivitySelect(activity.id)}>Select</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No activities found within the specified period.</p>
            )}

            {/* Display selected activities by month */}
            {selectedActivities.length > 0 && (
                <div>
                    <h3>Selected Activities</h3>
                    {selectedActivities.map(activity => (
                        <div key={activity.id}>
                            <p>{activity.name} - {activity.date}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
        
        </>
        
    );
}

export default ScheduledActivities;
