import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../images/freshcart-logo.svg"
import { AuthContext } from '../../Context/authantication'
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/Cartcontext';
import { Nav, Navbar, Container, NavDropdown, Form, button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
export default function NavbarComp() {

  const { token, setToken } = useContext(AuthContext);
  const { numOfcartitems } = useContext(cartContext);
  const navFunc = useNavigate();



  function logout() {
    localStorage.removeItem('tkn');
    setToken(null);
    navFunc('/login');
  }


  return <>

    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/products" active>Products</Nav.Link>
                <Nav.Link as={Link} to="/category">Categories</Nav.Link>
                <Nav.Link as={Link} to="/brands">Brands</Nav.Link>
                
              </>
            ) : null}
          </Nav>
          <Nav className="ms-auto align-items-center">

            {token ? (
              <>
              <Nav.Link as={Link} to="/cart">
              <i class="fa-solid fa-2xl fa-cart-shopping"></i>{' '}
                  <span className="position-relative">
                    {numOfcartitems >= '1' && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        {numOfcartitems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    )}
                  </span>
                </Nav.Link>
                <Nav.Link onClick={logout} style={{ cursor: 'pointer' }}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



  </>

}
