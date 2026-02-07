import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/user/login', formData);
            localStorage.setItem('id',res.data.id);
            localStorage.setItem('name',res.data.name);
            alert('login successful');
            navigate('/');
        }
        catch (err) {
            console.error('Error while loggig in user', err);
            alert('someting went wrong');
        }
    };

    return (
        <div className='container mt-5'>

            <div className='text-center mb-4'>
                <h2><i className='fas fa-user me-2'></i>Login</h2>
            </div>

            <form className='p-4 rounded shadow mx-auto' onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>

                <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input type='email' name='email' className='form-control' value={formData.email} onChange={handleChange} required placeholder='Enter your email' />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input type='password' name='password' className='form-control' value={formData.password} onChange={handleChange} required placeholder='Enter your password' />
                </div>

                <button type='submit' className='btn btn-primary w-100 mt-3'>Login</button>

            </form>

        </div>
    )
}

export default Login;
