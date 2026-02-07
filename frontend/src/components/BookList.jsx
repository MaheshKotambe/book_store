import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const BookList = () => {

    const navigate = useNavigate();
    const userid = localStorage.getItem('id');
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // if(!userid){
        //     navigate('/login');
        // }
        fetchBooks(userid);
    }, []);

    const fetchBooks = async (userid) => {
        try {
            const res = await axios.get(`http://127.0.0.1:5000/api/books/${userid}`);
            setBooks(res.data);
        }
        catch (err) {
            console.log("Error fetching books : ", err);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book')) {
            try {
                await axios.delete(`http://127.0.0.1:5000/api/books/${id}`);
                alert('Book deleted successfully');
                fetchBooks(); //refresh list
            }
            catch (err) {
                console.log('error deleting book', err);
                alert('error deleting book');
            }
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.price}</td>
                                <td>
                                    <a href={`/edit/${book._id}`} className='btn btn-sm btn-warning me-2'><i className='fas fa-edit'></i></a>
                                    <a href='' className='btn btn-sm btn-danger' onClick={() => handleDelete(book._id)}><i className='fas fa-trash'></i></a>
                                </td>
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