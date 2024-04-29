import React, { useState } from 'react';

const PurchaseTextbooks = () => {
    const [purchases, setPurchases] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        quantity: 1,
        creditCardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Perform validation
        validateInput(name, value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform validation
        if (!isFormValid()) {
            return;
        }

        // Calculate total amount
        const totalAmount = formData.quantity * 10; // Assuming each book costs $10

        // Apply discount if total amount exceeds $200
        let discountedAmount = totalAmount;
        if (totalAmount > 200) {
            discountedAmount = totalAmount * 0.9;
        }

        // Add purchase to purchases array
        const newPurchase = {
            title: formData.title,
            author: formData.author,
            quantity: formData.quantity,
            totalAmount: discountedAmount
        };
        setPurchases([...purchases, newPurchase]);

        // Reset form data
        setFormData({
            title: '',
            author: '',
            quantity: 1,
            creditCardNumber: '',
            expiryDate: '',
            cvv: ''
        });
    };

    const validateInput = (name, value) => {
        let error = '';

        if (name === 'creditCardNumber') {
            if (!value.match(/^\d{13,16}$/)) {
                error = 'Credit card number must have between 13 and 16 digits.';
            }
            
            
        }
        else if (name === 'cvv') {
            if (!value.match(/^\d{3}$/)) {
                error = 'CVV must have exactly 3 digits.';
            }
        }


        setErrors({ ...errors, [name]: error });
    };

    const isFormValid = () => {
        const { title, author, creditCardNumber, expiryDate, cvv } = formData;
        const newErrors = {};

        if (!title || !author || !creditCardNumber || !expiryDate || !cvv) {
            newErrors.general = 'Please fill out all fields.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
        <div className='purchasetb_background' >
        <br></br>
         <div style={{ backgroundColor: '#DDA674', padding: '20px', borderRadius: '10px', width: '400px', margin: '0 auto' }} >
            <h2 style={{ textAlign: 'center' }}>Purchase Textbooks</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields for purchasing textbooks */}
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        borderColor: errors.title ? 'red' : 'chocolate',
                        outline: 'none'
                    }}
                />
                {errors.title && (
                    <div style={{ color: 'red' }}>{errors.title}</div>
                )}
                <label>Author:</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        borderColor: errors.author ? 'red' : 'chocolate',
                        outline: 'none'
                    }}
                />
                {errors.author && (
                    <div style={{ color: 'red' }}>{errors.author}</div>
                )}
                <label>Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    required
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        borderColor: errors.quantity ? 'red' : 'chocolate',
                        outline: 'none'
                    }}
                />
                {errors.quantity && (
                    <div style={{ color: 'red' }}>{errors.quantity}</div>
                )}
                <label>Credit Card Number:</label>
                <input
                    type="text"
                    name="creditCardNumber"
                    value={formData.creditCardNumber}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        borderColor: errors.creditCardNumber ? 'red' : 'chocolate',
                        outline: 'none'
                    }}
                />
                {errors.creditCardNumber && (
                    <div style={{ color: 'red' }}>{errors.creditCardNumber}</div>
                )}
                <label>Expiry Date:</label>
                <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        borderColor: errors.expiryDate ? 'red' : 'chocolate',
                        outline: 'none'
                    }}
                />
                {errors.expiryDate && (
                    <div style={{ color: 'red' }}>{errors.expiryDate}</div>
                )}
                <label>CVV:</label>
<input
    type="text"
    name="cvv"
    value={formData.cvv}
    onChange={handleInputChange}
    required
    style={{
        padding: '10px',
        borderRadius: '5px',
        width: '100%',
        boxSizing: 'border-box',
        borderColor: errors.cvv ? 'red' : 'chocolate',
        outline: 'none'
    }}
/>
{errors.cvv && (
    <div style={{ color: 'red' }}>{errors.cvv}</div>
)}


                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        marginTop: '10px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Purchase
                </button>
                {errors.general && (
                    <div style={{ color: 'red' }}>{errors.general}</div>
                )}
            </form>
            {/* Display list of purchases */}
            <h2>Purchase History</h2>
            <ul>
                {purchases.map((purchase, index) => (
                    <li key={index}>
                        <p>Title: {purchase.title}</p>
                        <p>Author: {purchase.author}</p>
                        <p>Quantity: {purchase.quantity}</p>
                        <p>Total Amount: ${purchase.totalAmount.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
        </>
    );
}

export default PurchaseTextbooks;
