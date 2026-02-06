import React, {useState} from 'react';
import axios from 'axios';

const AddBook = ()=>{

    const [formData, setFormData] = useState({
        title:'',
        author:'',
        year:'',
        price:''
    });

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit =  (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://127.0.0.1:5000/api/books/', {
                method: 'POST',
                header: 'application/json',
                body : {
                    title: formData.title,
                    author: formData.author,
                    
                }
                
            });

        }
    }

    return(
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Add New Book</h2>
            
            <form className='border p-3 rounded bg-light' onSubmit={handleSubmit}>

                <div className='mb-3'>
                    <label classname='form-label'>Title</label>
                    <input type='text' onChange={handleChange} className='form-control' name='title' placeholder='Enter book title' required/>
                </div>
                
                <div className='mb-3'>
                    <label classname='form-label'>Author</label>
                    <input type='text' onChange={handleChange} className='form-control' name='author' placeholder='Enter author name'/>
                </div>
                
                <div className='mb-3'>
                    <label classname='form-label'>Year of publication</label>
                    <input type='number' onChange={handleChange} className='form-control' name='year' placeholder='Enter publication year'/>
                </div>
                
                <div className='mb-4'>
                    <label classname='form-label'>Price ₹</label>
                    <input type='number' onChange={handleChange} className='form-control' name='price' placeholder='Enter book price in rupees only'/>
                </div>
                
                <button type='submit' className='btn btn-primary w-100'><i className='fas fa-plus-circle me-2'></i>Add Book</button>
            
            </form>
        </div>
    )
}

export default AddBook;