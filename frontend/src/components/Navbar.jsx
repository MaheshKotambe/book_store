import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userid = localStorage.getItem('id');

    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className='container'>

                <Link className='navbar-brand' to='/'><i className='fas fa-book me-2'></i>Books Manager</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/"><i className='fas fa-home me-1'></i>Home</Link>
                        </li>

                        {userid ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-book"><i className='fas fa-plus me-1'></i>Add Book</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/change-password"><i className='fas fa-key me-1'></i>Change Password</Link>
                                </li>

                                <button className="btn btn-danger btn-sm ms-2" onClick={handleLogout}>
                                    <i className='fas fa-sign-out-alt me-1'></i>Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup"><i className='fas fa-user-plus me-1'></i>Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login"><i className='fas fa-sign-in-alt me-1'></i>Login</Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar;