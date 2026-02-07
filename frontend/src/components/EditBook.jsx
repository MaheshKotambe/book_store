import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {

    const { id } = useParams();
    const userid = localStorage.getItem('id');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        price: ''
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/books/${userid}`)
            .then(res => {
                const book = res.data.find(b => b._id === id);
                if (book) setFormData(book);
            })
            .catch(err => console.error('error fetching books', err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:5000/api/books/${id}`, formData);
            alert('book updated successfully');
            navigate('/');
        }
        catch (err) {
            console.error('Error updating book', err);
            alert('error updating book');
        }
    }

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Update Book</h2>

            <form className='border p-3 rounded bg-light mx-auto' onSubmit={handleSubmit} style={{maxWidth:'500px'}}>

                <div className='mb-3'>
                    <label classname='form-label'>Title</label>
                    <input type='text' onChange={handleChange} value={formData.title} className='form-control' name='title' placeholder='Enter book title' required />
                </div>

                <div className='mb-3'>
                    <label classname='form-label'>Author</label>
                    <input type='text' onChange={handleChange} value={formData.author} className='form-control' name='author' placeholder='Enter author name' />
                </div>

                <div className='mb-3'>
                    <label classname='form-label'>Year of publication</label>
                    <input type='number' onChange={handleChange} value={formData.year} className='form-control' name='year' placeholder='Enter publication year' />
                </div>

                <div className='mb-4'>
                    <label classname='form-label'>Price ₹</label>
                    <input type='number' onChange={handleChange} value={formData.price} className='form-control' name='price' placeholder='Enter book price in rupees only' />
                </div>

                <button type='submit' className='btn btn-primary w-100'><i className='fas fa-sync me-2'></i>Update Book</button>

            </form>
        </div>
    )
}

export default EditBook;