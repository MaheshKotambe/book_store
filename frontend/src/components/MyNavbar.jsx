import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container} from 'react-bootstrap';

const MyNavbar = () => {
    const navigate = useNavigate();
    const userid = localStorage.getItem('id');

    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        navigate('/login');
    }

    return (

        <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
            <Container>
                {/* as={Link} allows Bootstrap to work with React Router */}
                <Navbar.Brand as={Link} to="/"><i className='fas fa-book text-primary'></i>Books Manager</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        {userid ? (
                            <>
                                <Nav.Link as={Link} to="/add-book">Add Book</Nav.Link>
                                <Nav.Link as={Link} to="/change-password">change password</Nav.Link>
                                <Nav.Link onClick={handleLogout} className="text-danger">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default MyNavbar;