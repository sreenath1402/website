import React, { useState, useEffect } from 'react';

const TextbookSearching = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [bookstoreData, setBookstoreData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/textbook_data.json')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Output the retrieved data to the console
                setSearchResults(data); // Set the retrieved data in state
            })
            .catch(error => console.error('Error fetching textbook data:', error));

        fetch('/bookstore_data.json')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Output the retrieved data to the console
                setBookstoreData(data); // Set the retrieved data in state
            })
            .catch(error => console.error('Error fetching bookstore data:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchBooks = () => {
        try {
            const results = searchTerm.length > 0 ? searchResults.filter(book =>
                (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (book.isbn && book.isbn.toString().includes(searchTerm)) // Check if ISBN is present and matches search term
            ) : [];

            if (results.length > 0) {
                return results.map(book => (
                    <div key={book.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                            {book.isbn && <p className="card-text">ISBN: {book.isbn}</p>}
                            <p className="card-text">Availability: {book.availability ? "Available" : "Unavailable"}</p>
                            {book.availability && (
                                <p className="card-text">Location: Row {book.row}, Column {book.column}</p>
                            )}
                            <hr/>
                        </div>
                    </div>
                ));
            } else {
                // Display bookstore options
                return (
                    <div>
                        <p>Book not available in the school library.</p>
                        <p>You can purchase it from one of the following bookstores:</p>
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                {bookstoreData.slice(0, 3).map(store => (
                                    <li key={store.name} className="list-group-item">
                                        <h5 className="card-title">{store.name}</h5>
                                        <p className="card-text">Location: {store.location}</p>
                                        <p className="card-text">Contact: {store.contact}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            }
        } catch (error) {
            console.error('Error in searching books:', error);
            setError('Error searching books');
            return null;
        }
    };

    return (
        <>
            <div className='textbook_background '>
                <br/>
                <div style={{ backgroundColor: '#CFB79E', padding: '20px', borderRadius: '10px', width: '400px', margin: '0 auto' }} >
                    <h2 style={{ textAlign: 'center' }}>Search here for Textbooks</h2>
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search by Title, Author, or ISBN"
                        value={searchTerm}
                        style={{ padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box', borderColor: 'chocolate', outline: 'none' }}
                        onChange={handleSearchChange}
                    />

                    {/* Display search results or bookstore options */}
                    <div className="row">
                        {searchBooks()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TextbookSearching;
