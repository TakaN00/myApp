import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const DashboardNavbar = () => {


  return (
    <Navbar bg="info" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Brand>
          <Link style={{color: 'black', fontWeight: '700'}} to='/dashboard' className="dashnavlink">Dashboard</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
              <Link to='/productlist' className="dashnavlink">Product List</Link>
              <Link to='/addproduct' className="dashnavlink">Add Product</Link>
              <Link to='/orderlist' className="dashnavlink">Order List</Link>
              <Link to='/categorylist' className="dashnavlink">Category List</Link>
              <Link to='/userlist' className="dashnavlink">User List</Link>
              <Link to='/messagelist' className="dashnavlink">Messages</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
