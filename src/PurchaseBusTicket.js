import React, { useState } from 'react';

const PurchaseBusTicket = () => {
    const [formData, setFormData] = useState({
        creditCardNumber: '',
        expiryDate: '',
        cvv: '',
        selectedZones: [],
        numberOfTickets: 0,
        numberOfBusCards: 0
    });
    const [submittedData, setSubmittedData] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFormData({
                ...formData,
                selectedZones: [...formData.selectedZones, value]
            });
        } else {
            setFormData({
                ...formData,
                selectedZones: formData.selectedZones.filter(zone => zone !== value)
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process form submission
        // Calculate total amount based on selected options
        let totalAmount = 0;
        totalAmount += formData.selectedZones.reduce((acc, zone) => {
            if (zone === 'zone1') {
                return acc + 2;
            } else if (zone === 'zone2') {
                return acc + 4;
            } else if (zone === 'zone3') {
                return acc + 6;
            }
            return acc;
        }, 0);
        totalAmount += formData.numberOfTickets * 10; // Each ticket costs $10
        totalAmount += formData.numberOfBusCards * 40; // Each bus card costs $40

        // Store submitted data
        setSubmittedData({
            creditCardNumber: formData.creditCardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            selectedZones: formData.selectedZones,
            numberOfTickets: formData.numberOfTickets,
            numberOfBusCards: formData.numberOfBusCards,
            totalAmount: totalAmount
        });

        // Reset form data
        setFormData({
            creditCardNumber: '',
            expiryDate: '',
            cvv: '',
            selectedZones: [],
            numberOfTickets: 0,
            numberOfBusCards: 0
        });
    };

    return (
        <>
        <div  className='busticket_background'>
            <br/>

        <div style={{ backgroundColor: '#8CC1DF', padding: '20px', borderRadius: '10px', width: '400px', margin: '0 auto' }}>
            
            <h2 style={{ textAlign: 'center' }} >Purchase Bus Tickets</h2>
            <form onSubmit={handleSubmit}>
                {/* Credit card input fields */}
                <label>Credit Card Number:</label>
                <input type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleInputChange} required 
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }}/>
                <label>Expiry Date:</label>
                <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }} />
                <label>CVV:</label>
                <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }} />

                {/* Zone selection */}
                <br></br>
                <label>Choose Zones:</label>
                <div>
                    <label>
                        <input type="checkbox" name="zone1" value="zone1" checked={formData.selectedZones.includes('zone1')} onChange={handleCheckboxChange}
                         />
                        Zone 1 ($2)
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="zone2" value="zone2" checked={formData.selectedZones.includes('zone2')} onChange={handleCheckboxChange}
                   />
                        Zone 2 ($4)
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="zone3" value="zone3" checked={formData.selectedZones.includes('zone3')} onChange={handleCheckboxChange}
                       />
                        Zone 3 ($6)
                    </label>
                </div>

                {/* Number of tickets input field */}
                <label>Number of Tickets:</label>
                <input type="number" name="numberOfTickets" value={formData.numberOfTickets} onChange={handleInputChange} min="0"
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }} />

                {/* Number of bus cards input field */}
                <label>Number of Bus Cards:</label>
                <input type="number" name="numberOfBusCards" value={formData.numberOfBusCards} onChange={handleInputChange} min="0"
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }} />

                {/* Submit button */}
                <button type="submit"  style={{ padding: '10px 20px', borderRadius: '5px',marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Purchase</button>
            </form>

            {/* Display submitted data */}
            {submittedData && (
                <div>
                    <h3>Purchase History</h3>
                    <p>Credit Card Number: {submittedData.creditCardNumber}</p>
                    <p>Expiry Date: {submittedData.expiryDate}</p>
                    <p>CVV: {submittedData.cvv}</p>
                    <p>Selected Zones: {submittedData.selectedZones.join(', ')}</p>
                    <p>Number of Tickets: {submittedData.numberOfTickets}</p>
                    <p>Number of Bus Cards: {submittedData.numberOfBusCards}</p>
                    <p>Total Amount: ${submittedData.totalAmount.toFixed(2)}</p>
                </div>
            )}
        </div>
        </div>
        
        
        
        </>
        
    );
}

export default PurchaseBusTicket;
