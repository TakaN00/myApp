import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import '../CSS/dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { getAllOrders } from '../slices/orderSlice';
import { getUserList } from '../slices/userSlice';


const Dashboard = () => {
  const dispatch = useDispatch()
  const {productList} = useSelector(state=>state.product)
  const {orderList} = useSelector((state) => state.order);
  const {userList} = useSelector((state) => state.user);
  useEffect(() =>{
      dispatch(getProducts())
      dispatch(getAllOrders())
      dispatch(getUserList())
  },[])
  return (
    <div className="dashboard-container">
    <div className="dashboard-box">

      <div className="card-box">
      <Card>
        <Card.Body className="card-body card-user">
          <div>
            <i className="bi bi-people-fill card-icon"></i>
            <Card.Title>Users</Card.Title>
            <Card.Subtitle className="mb-2">Registred Users</Card.Subtitle>
          </div>
          <Card.Text className="card-text">
            {userList.length}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>

      <div className="card-box">
      <Card>
        <Card.Body className="card-body card-product">
          <div>
            <i className="bi bi-box-seam card-icon"></i>
            <Card.Title>Products</Card.Title>
            <Card.Subtitle className="mb-2">All products</Card.Subtitle>
          </div>
          <Card.Text className="card-text">
            {productList.length}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>

      <div className="card-box">
      <Card>
        <Card.Body className="card-body card-order">
          <div>
            <i className="bi bi-cart-fill card-icon"></i>
            <Card.Title>Orders</Card.Title>
            <Card.Subtitle className="mb-2">New orders</Card.Subtitle>
          </div>
          <Card.Text className="card-text">
            {orderList.filter(el=>el.status=="pending").length}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>

      <div className="card-box">
      <Card>
        <Card.Body className="card-body card-order">
          <div>
            <i className="bi bi-cart-fill card-icon"></i>
            <Card.Title>Orders</Card.Title>
            <Card.Subtitle className="mb-2">Fulfilled orders</Card.Subtitle>
          </div>
          <Card.Text className="card-text">
            {orderList.filter(el=>el.status=="fulfilled").length}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>

      <div className="card-box">
      <Card>
        <Card.Body className="card-body card-revenue">
          <div>
            <i className="bi bi-cash-stack card-icon"></i>
            <Card.Title>Revenue</Card.Title>
            <Card.Subtitle className="mb-2">Forecast revenues</Card.Subtitle>
          </div>
          <Card.Text className="card-text">
            {orderList.filter(el=>el.status=="pending").reduce((total, currentValue) => total = total + currentValue.amount,0)}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>

      <div className="card-box">
      <Card>
        <Card.Body className="card-body card-revenue">
          <div>
            <i className="bi bi-cash-stack card-icon"></i>
            <Card.Title>Revenue</Card.Title>
            <Card.Subtitle className="mb-2">Cashed revenues</Card.Subtitle>
          </div>
          <Card.Text className="card-text">
            {orderList.filter(el=>el.status=="fulfilled").reduce((total, currentValue) => total = total + currentValue.amount,0)}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>

    </div>
    </div>
  )
}

export default Dashboard 