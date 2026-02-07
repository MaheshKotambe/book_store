import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {

    const navigate = useNavigate();

    const userid = localStorage.getItem('id');
    useEffect(() => {
        if (!userid) {
            navigate('/login');
        }
    }, [])

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        else if (formData.oldPassword === formData.newPassword) {
            alert('Same passwords old and new');
            return;
        }

        try {
            const res = await axios.post(`http://127.0.0.1:5000/api/user/change_password/${userid}`,{
                oldPassword:formData.oldPassword,
                newPassword:formData.newPassword
            });
            
            if (res.status === 200) {
                alert(res.data.msg);
                setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            }
            else {
                alert(res.data.msg);
            }
        }
        catch (error) {
            console.error('Error', error);
            alert('Something went wrong, Try again');

        }
    };

    return (
        <div className='container mt-5'>

            <div className='text-center mb-4'>
                <h2><i className='fas fa-key me-2'></i> Change Password</h2>
            </div>

            <form className='border p-3 rounded bg-light mx-auto' onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                <div className='mb-3'>
                    <label className='form-label'>Old Password</label>
                    <input type='password' name='oldPassword' className='form-control' value={formData.oldPassword} onChange={handleChange} required placeholder='Enter your old password' />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>New Password</label>
                    <input type='password' name='newPassword' className='form-control' value={formData.newPassword} onChange={handleChange} required placeholder='Enter your new password' />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Confirm Password</label>
                    <input type='password' name='confirmPassword' className='form-control' value={formData.confirmPassword} onChange={handleChange} required placeholder='Confirm your new password' />
                </div>

                <button type='submit' className='btn btn-primary w-100 mt-3'>Change Password</button>

            </form>

        </div>
    )
}

export default ChangePassword;