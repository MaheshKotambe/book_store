import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AddBook = ({onBookAdded})=>{

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title:'',
        author:'',
        year:'',
        price:''
    });

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const userid = localStorage.getItem('id');

        try{
            await axios.post(`http://127.0.0.1:5000/api/books/${userid}`, formData);
            alert('book added successfully');
            setFormData({title:'', author:'', year:'', price:''});
            if(onBookAdded) onBookAdded();
            navigate('/');
        }
        catch(err){
            console.error('Error adding book', err);
            alert('error adding book');
        }
    }

    return(
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Add New Book</h2>
            
            <form className='border p-3 rounded bg-light mx-auto' onSubmit={handleSubmit} style={{maxWidth:'600px'}}>

                <div className='mb-3'>
                    <label classname='form-label'>Title</label>
                    <input type='text' onChange={handleChange} value={formData.title} className='form-control' name='title' placeholder='Enter book title' required/>
                </div>
                
                <div className='mb-3'>
                    <label classname='form-label'>Author</label>
                    <input type='text' onChange={handleChange} value={formData.author} className='form-control' name='author' placeholder='Enter author name' required/>
                </div>
                
                <div className='mb-3'>
                    <label classname='form-label'>Year of publication</label>
                    <input type='number' onChange={handleChange} value={formData.year} className='form-control' name='year' placeholder='Enter publication year'/>
                </div>
                
                <div className='mb-4'>
                    <label classname='form-label'>Price ₹</label>
                    <input type='number' onChange={handleChange} value={formData.price} className='form-control' name='price' placeholder='Enter book price in rupees only'/>
                </div>
                
                <button type='submit' className='btn btn-primary w-100'><i className='fas fa-plus-circle me-2'></i>Add Book</button>
            
            </form>
        </div>
    )
}

export default AddBook;