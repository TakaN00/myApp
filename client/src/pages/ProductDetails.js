import React, { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import FeaturedProducts from "../components/FeaturedProducts";
import "../CSS/productDetails.css";

import { addToCart } from "../slices/cartSlice";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";


const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  const nav = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const params = useParams();
  const product = productList.find((el) => el._id === params.id);

  const addToCartHandler = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    setShow(true);
  };

  const [show, setShow] = useState(false);

  return (
    <div>
      <div className=" py-5">
        <div className="row">
          <div className="col-10 mx-auto text-center  my-3">
            <h1>{product?.title}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3 productDetails-img">
            <img src={product?.img} className="img-fluid" alt="product cover" style={{maxHeight: '500px' }} />
          </div>

          <div className="col-10 mx-auto col-md-6 my-3 productDetails-right-box">
            <div>
              <h2>{product?.category}</h2>

              {product?.onStock && product?.discount ? (
                <div className="">
                  <h4
                    style={{ textDecoration: "line-through", fontSize: "18px" }}
                  >{`${product?.price} TND`}</h4>
                  <h4>{`${
                    (product?.price * (100 - product?.discount)) / 100
                  } TND`}</h4>
                </div>
              ) : (
                <h4>Price: {product?.price} TND</h4>
              )}

              {!product?.onStock ? (
                <span className="productDetails-outOfStock">Out of stock</span>
              ) : (
                product?.discount===0 ? (
                <span className="productDetails-available">Available</span>
              ):null)}
              <div style={{ marginTop: "10px" }}>
                {product?.onStock && product?.discount > 0 && (
                  <span className="productDetails-discount">
                    {product?.discount}% Discount
                  </span>
                )}
              </div>
              <p className="font-weight-bold mt-3 mb-0">Product description:</p>
              <p className="text-muted lead">{product?.desc}</p>
            </div>
            <div className="productDetails-btn-box">
              <Button
                variant="light"
                className="productDetails-btn"
                onClick={() => nav("/shop")}
              >
                <i
                  className="bi bi-arrow-left"
                  style={{ fontSize: "0.8rem" }}
                ></i>{" "}
                Back to shop
              </Button>
              {product?.onStock && (
                <Button
                  variant="danger"
                  className="productDetails-btn"
                  onClick={addToCartHandler}
                >
                  <i className="bi bi-cart3" style={{ fontSize: "0.8rem" }}></i>{" "}
                  Add to cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        className="p-3 success position-absolute"
        position="bottom-center"
        style={{ zIndex: 2 }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          autohide
          bg="info"
        >
          <Toast.Header>
            <strong className="me-auto">A&G</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body>{product?.title} has been added to your cart</Toast.Body>
        </Toast>
      </ToastContainer>

      <FeaturedProducts category={product?.category} />

    </div>
  );
};

export default ProductDetails;
