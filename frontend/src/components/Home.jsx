import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Home = () => {

    const userid = localStorage.getItem('id');
    const username = localStorage.getItem('name');
    const [books, setBooks] = useState([]);

    useEffect(() => {
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
        <div className='container text-center mt-5'>
            <div className='mt-4'>

                {userid ? (
                    <div className='container mt-5'>
                        <h3 className='mb-4'>Hello <span className='text-primary'>{username}</span></h3>
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
                ) : (
                    <>
                        <h1>Welcome to <span className='text-primary'>Books Manager</span></h1>
                        <p className='lead'>keep record of your books easily</p>

                        <Link to='/signup' className='btn btn-primary mx-2'>
                            <i className='fas fa-user-plus me-2'></i> Signup</Link>

                        <Link to='/login' className='btn btn-success mx-2'>
                            <i className='fas fa-sign-in-alt me-2'></i> Login</Link>
                    </>
                )}

            </div>
        </div>
    )
}

export default Home;