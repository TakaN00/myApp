import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Navigationbar from './components/Navigationbar';
import ProtectedRoute from './components/ProtectedRoute';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import DashboardNavbar from './components/DashboardNavbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import jwt_decode from "jwt-decode";
import {useSelector} from "react-redux"
import AdminProtectedRoute from './components/AdminProtectedRoute';
import OrderList from './pages/OrderList';
import Footer from './components/Footer';
import CategoryList from './pages/CategoryList';
import MessageList from './pages/MessageList';
import UserList from './pages/UserList';
 


function App() {
  
  var token = useSelector(state=>state.user.token)

  return (
    <div>
      <Navigationbar/>

      {(token && jwt_decode(token).role === "admin")?
      <DashboardNavbar/>
      :null}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/shop/:id' element={<ProductDetails/>}/>
        
        <Route element={<ProtectedRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Route>

        <Route element={<AdminProtectedRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/productlist' element={<ProductList/>}/>
          <Route path='/orderlist' element={<OrderList/>}/>
          <Route path='/categorylist' element={<CategoryList/>}/>
          <Route path='/userlist' element={<UserList/>}/>          
          <Route path='/messagelist' element={<MessageList/>}/>
        </Route>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
