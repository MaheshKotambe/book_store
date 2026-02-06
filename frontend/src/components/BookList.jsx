import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/books/');
            setBooks(res.data);
        }
        catch (err) {
            console.log("Error fetching books : ", err);
        }
    }

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Book List</h2>
            <table className='table table-bordered table-hover'>
                <thead className='table-primary'>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <tr>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.price}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>No books found</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    )
}

export default BookList;