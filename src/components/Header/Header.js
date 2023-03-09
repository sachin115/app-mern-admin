import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signout } from '../../actions';
import { Button } from 'react-bootstrap'


export default function Header() {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout())
    }

    const renderLogedInLinks = () => {
        return (
            // <Nav>
            //     <span className='nav-link' onClick={logout}>Signout</span>
            // </Nav>
            <div><Button onClick={logout}>Signout</Button></div>
        )
    }

    const rendernonLogedInLinks = () => {
        return (
            <Nav>
                <NavLink to="/signin" className='nav-link'>Signin</NavLink>
                <NavLink to="/signup" className='nav-link'>Signup</NavLink>
            </Nav>
        )
    }
    return (
        <div>

            <Navbar style={{ zIndex: 1 }} fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Link to='/' className="navbar-brand">Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> 
                        */}
                        </Nav>
                        {auth.authenticate ? renderLogedInLinks() : rendernonLogedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}
