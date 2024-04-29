import React, { useState } from 'react';

const MealPlan = () => {
    const [formData, setFormData] = useState({
        creditCardNumber: '',
        expiryDate: '',
        cvv: '',
        planOption: ''
    });
    const [submittedData, setSubmittedData] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process form submission
        // Calculate total amount based on selected plan option
        let totalAmount = 0;
        if (formData.planOption === 'Month') {
            totalAmount = 600;
        } else if (formData.planOption === 'Semester') {
            totalAmount = 600 * 6 * 0.95; // 5% discount for semester plan
        }

        // Store submitted data
        setSubmittedData({
            creditCardNumber: formData.creditCardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            planOption: formData.planOption,
            totalAmount: totalAmount
        });

        // Reset form data
        setFormData({
            creditCardNumber: '',
            expiryDate: '',
            cvv: '',
            planOption: ''
        });
    };

    return (
        <>
        <div className='meal_background '>
        <br/>
        <div style={{ backgroundColor: '#FFBD59', padding: '20px', borderRadius: '10px', width: '400px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>Meal Plan Purchase</h2>
            <form onSubmit={handleSubmit}>
                {/* Credit card input fields */}
                <label>Credit Card Number:</label>
                <input type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleInputChange} required 
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }}/>
                <label>Expiry Date:</label>
                <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required 
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }}/>
                <label>CVV:</label>
                <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }} />

                {/* Plan option select input field */}
                <label>Plan Option:</label>
                <select name="planOption" value={formData.planOption} onChange={handleInputChange} required
                style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none'  }}>
                    <option value="">Select Plan Option</option>
                    <option value="Month">Plan by Month - $600</option>
                    <option value="Semester">Plan by Semester - 5% Discount</option>
                </select>

                {/* Submit button */}
             
                <button style={{ padding: '10px 20px', borderRadius: '5px',marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }} type="submit">Purchase</button>
            </form>

            {/* Display submitted data */}
            {submittedData && (
                <div>
                    <h3>Plan Opted</h3>
                    <p>Credit Card Number: {submittedData.creditCardNumber}</p>
                    <p>Expiry Date: {submittedData.expiryDate}</p>
                    <p>CVV: {submittedData.cvv}</p>
                    <p>Plan Option: {submittedData.planOption}</p>
                    <p>Total Amount: ${submittedData.totalAmount.toFixed(2)}</p>
                </div>
            )}
        </div>
        

        </div>
        
        </>
        
    );
}

export default MealPlan;
