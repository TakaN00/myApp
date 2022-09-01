import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {useDispatch, useSelector} from 'react-redux'
import { getCategories, selectCategory } from '../slices/categorySlice';

import '../CSS/shopNavbar.css'

const ShopNavbar = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
      }, []);
    const categoryList = useSelector((state) => state.category.categoryList);
  return (
    <div>
        <Navbar bg="light" variant="light" expand="sm">
            <Container>
                <Navbar.Brand style={{color: 'black', fontWeight: '500'}}></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className="shopNavbar-toggle"><i className="bi bi-search"></i></Navbar.Toggle>
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link disabled>Categories: </Nav.Link>
                    <Nav.Link onClick={()=>dispatch(selectCategory(""))} className="search-active">All</Nav.Link>
                    {categoryList.map((category) => (
                    <Nav.Link onClick={()=>dispatch(selectCategory(`${category.title}`))} className="search-active" key={category._id}>{category.title}</Nav.Link>
                    ))}

                </Nav>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e)=>props.getSearch(e.target.value)}
                    />
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default ShopNavbar