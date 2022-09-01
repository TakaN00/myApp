import React, { useState } from "react";
import "../CSS/productCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { addToWishlist } from "../slices/wishlistSlice";

const ProductCard = ({ product, scale }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    setShow(true)
  };

  const addToWishlistHandler = () => {
    dispatch(addToWishlist({ productId: product._id, quantity: 1 }));
    setShow(true)
  };

  const [show, setShow] = useState(false);

  const nav = useNavigate();
  const {isAuth} = useSelector(state=>state.user)

  return (
    <div style={{transform: `scale(${scale})`}}>
      <div className="productCard">
        <div className="productImgBox">
          <img src={product.img} alt="product cover" style={{maxHeight: '250px' }}/>

          {!product.onStock && (
            <span className="productStock">Out of stock</span>
          )}

          {product.onStock && product.discount>0 && (
            <span className="productDiscount">{product.discount}% Discount</span>
          )}

          <ul className="productAction">
            {isAuth&&product.onStock &&(
              <>
            <li onClick={addToWishlistHandler}>
              <i className="bi bi-heart"></i>
              <span>Add to Wishlist</span>
            </li>
              <li onClick={addToCartHandler}>
                <i className="bi bi-cart3"></i>
                <span>Add to Cart</span>
              </li>
            </>
            )}
            <li>
              <div onClick={() => nav(`/shop/${product._id}`)} style={{ color: "black" }}>
                <i className="bi bi-eye"></i>
                <span>View Details</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="productContent">
          <div className="productName">
            <h3>{product.title}</h3>
          </div>
          <div className="productPriceCategory">
            <div className="productCategory">
              <h3>{product.category}</h3>
            </div>
            {(product.onStock && product.discount) ? (
              <div className="productPrice">
            <h2 style={{textDecoration : "line-through" , fontSize :"18px"}} >{`${product.price} TND`}</h2>
            <h1>{`${product.price*(100-product.discount)/100} TND`}</h1>
              </div>
            ):<h2>{`${product.price} TND`}</h2> }
          </div>
        </div>
      </div>

        <ToastContainer 
            className="p-3 success position-absolute" 
            position='bottom-center' 
            style={{zIndex:2}}
        >
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            autohide
            bg="light"
          >
            <Toast.Header>
              <strong className="me-auto">A&G</strong>
              <small>Now</small>
            </Toast.Header>
            <Toast.Body style={{textAlign: 'center'}}>
              {product.title} has been added
            </Toast.Body>
          </Toast>
        </ToastContainer>
    </div>
  );
};

export default ProductCard;
