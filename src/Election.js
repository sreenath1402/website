import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Election = () => {
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState({});

    // Generate random votes for each candidate initially
    useEffect(() => {
        const randomVotes = {
            John: Math.floor(Math.random() * 200),
            Mary: Math.floor(Math.random() * 200),
            Susan: Math.floor(Math.random() * 200)
        };
        setResults(randomVotes);
    }, []);

    const handleCandidateSelect = (event) => {
        setSelectedCandidate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Submit vote to the local server
        try {
            const response = await fetch('/submit_vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ candidate: selectedCandidate })
            });
            if (response.ok) {
                setSubmitted(true);
            } else {
                console.error('Failed to submit vote');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    useEffect(() => {
        // Draw pie chart when results are available
        if (results && Object.keys(results).length > 0) {
            drawChart();
        }
    }, [results]);

    const drawChart = () => {
        const ctx = document.getElementById('electionChart');
        const labels = Object.keys(results);
        const data = Object.values(results);

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Votes',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <>
            <div className='election_background'>
                <br />
                <div style={{ backgroundColor: '#FFDE59', padding: '20px', borderRadius: '10px', width: '400px', height: '300px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center' }}>Election</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="radio" name="candidate" value="John" checked={selectedCandidate === 'John'} onChange={handleCandidateSelect} style={{ marginLeft: '170px' }}
                            />
                            John
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="candidate" value="Mary" checked={selectedCandidate === 'Mary'} onChange={handleCandidateSelect} style={{ marginLeft: '170px' }}
                            />
                            Mary
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="candidate" value="Susan" checked={selectedCandidate === 'Susan'} onChange={handleCandidateSelect} style={{ marginLeft: '170px' }} />
                            Susan
                        </label>
                        <br />
                        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', marginTop: '200px', marginLeft: '170px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Vote</button>
                    </form>

                    {submitted && <p>Thank you for your vote!</p>}

                    {/* Display pie chart */}
                    <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                        <canvas id="electionChart" width="400" height="200"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Election;
