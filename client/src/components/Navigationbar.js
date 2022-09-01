import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector,useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../slices/userSlice';
import WishlistSidebar from './WishlistSidebar';

const Navigationbar = () => {


  const dispatch = useDispatch()
  const nav = useNavigate()
  const {isAuth} = useSelector(state=>state.user)

  const cart = useSelector((state) => state.cart.cartList);

  const totalQuantity = cart&&cart.filter(el=>el.quantity>0).reduce((total, currentValue) => total = total + currentValue.quantity,0)

  const logoutHandler = (e) =>{
    e.preventDefault()
    dispatch(logout())
    nav('/login')
  }

  return (
    <>

        <Navbar bg="light" expand="sm" className="mb-0">
          <Container fluid>
            <Navbar.Brand>
              <Link to='/'><img src="https://res.cloudinary.com/takan0/image/upload/v1659632476/AnG/ang_01_zkhqfv.png" height="40" alt="logo"/></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                  Anime and Gaming Shop
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 ps-5">
                  <Link to='/shop' className="navlink">Shop</Link>
                  <Link to='/contact' className="navlink">Contact</Link>
                </Nav>

                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {isAuth ? (
                    <>

                    <Link to='/cart' className="navlink">              
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill='currentColor' className="bi bi-bag-fill" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                  </svg>
                  <span className="totalQuantitySpan">{totalQuantity}</span>
                    </Link>
                    <WishlistSidebar/>
                    </>    
                    ):null}

                  <NavDropdown
                      align="end"
                      title=
                            {<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill='grey' className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>}
                      id={`offcanvasNavbarDropdown-expand-sm`}
                    >
                      {isAuth ? (
                        <>
                      <NavDropdown.Item>
                        <Link to='/profile' className="navlink">Profile</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      
                      <NavDropdown.Item>
                        <div className="navdrop" onClick={logoutHandler}>
                          Logout
                        </div>
                      </NavDropdown.Item>
                        </>
                      ):(
                        <>
                      <NavDropdown.Item>
                        <Link to='/login' className="navlink">Login</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link to='/register' className="navlink">Register</Link>
                      </NavDropdown.Item>
                        </>
                      )}
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

    </>
  )
}

export default Navigationbar