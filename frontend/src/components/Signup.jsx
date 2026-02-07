import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/api/user/signup', formData);
            alert('signup successful, please login');
            navigate('/login');
        }
        catch (err) {
            console.error('Error while registering user', err);
            alert('someting went wrong');

        }
    };

    return (
        <div className='container mt-5'>

            <div className='text-center mb-4'>
                <h2><i className='fas fa-user-plus me-2'></i> Signup</h2>
            </div>

            <form className='border p-3 rounded bg-light mx-auto' onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                <div className='mb-3'>
                    <label className='form-label'>Username</label>
                    <input type='text' name='name' className='form-control' value={formData.FullName} onChange={handleChange} required placeholder='Enter username' />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input type='email' name='email' className='form-control' value={formData.Email} onChange={handleChange} required placeholder='Enter your email' />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input type='password' name='password' className='form-control' value={formData.Password} onChange={handleChange} required placeholder='Enter your password' />
                </div>

                <button type='submit' className='btn btn-primary w-100 mt-3'>Sign Up</button>

            </form>

        </div>
    )
}

export default Signup;
