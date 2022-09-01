import React,{useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

import { deleteProduct, getProducts } from '../slices/productSlice'
import {useDispatch, useSelector} from 'react-redux'
import UpdateProduct from "../components/UpdateProduct";

const ProductList = () => {

    const dispatch = useDispatch()
    const {productList} = useSelector(state=>state.product)
    useEffect(() =>{
        dispatch(getProducts())
    },[])

  return (
    <div>
      <Tab.Container className="productList" id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={2}>
          </Col>
          <Col sm={8}>
            <Tab.Content className="m-4 productList">
              {productList.map(product => 
            <Row className="mt-4" key={product._id}>
                <Col >
                    <div className="productListDiv">Title:</div>
                {product.title}
                </Col >                
                <Col sm={2}>
                    <div className="productListDiv">Image:</div>
                <img src={product.img} style={{maxHeight:'100px'}} alt="product cover"/>
                </Col >
                <Col >
                    <div className="productListDiv">Description:</div>
                {`${product.desc.substring(0,50)} ...`}
                </Col >
                <Col >
                    <div className="productListDiv">Category:</div>
                {product.category}
                </Col >
                <Col >
                    <div className="productListDiv">Sub-Cat:</div>
                {product.subcategory}
                </Col >
                <Col >
                    <div className="productListDiv">Price:</div>
                {`${product.price} TND`}
                </Col >
                <Col >
                    <div className="productListDiv">Discount:</div>
                {`${product.discount}%`}
                </Col >
                <Col >
                    <div className="productListDiv">On Stock:</div>
                {`${product.onStock}`}
                </Col >
                <Col >
                    <div className="productListDiv">Featured:</div>
                {`${product.featured}`}
                </Col >
                <Col className='productListBtn' sm={2}>
                    <UpdateProduct product={product}/>
                    <Button className="mb-2" size="lg" variant="danger" onClick={e=>{dispatch(deleteProduct(product._id))}}>Delete</Button>
                </Col >
            </Row>
            )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ProductList;
