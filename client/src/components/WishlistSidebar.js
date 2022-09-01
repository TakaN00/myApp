import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { addToWishlist, deleteWishlist, getWishlist, removeWishlist } from "../slices/wishlistSlice";

const WishlistSidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const nav = useNavigate()

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const addToCartHandler = () => {
    for (let i = 0; i < wishlist.length; i++) {
        dispatch(addToCart({ productId: wishlist[i].productId._id, quantity: wishlist[i].quantity }));
    }
    dispatch(deleteWishlist())
  };

  return (
    <div>
        <div className="navlink">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="grey"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
                onClick={handleShow}
            >
                <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
            </svg>
        </div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Wishlist</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div className="cart-container">
                <div className="row">
                <div className="col-md-12">
                    {wishlist.length===0 ? <div className="col">Your wishlist is empty!</div> : null}
                    {wishlist&&wishlist.map((product) => (
                    <div className="row border-top border-bottom" key={product._id}>
                    <div className="row main align-items-center">
                        <div className="col-2">
                        <img
                            className="img-fluid"
                            src={product.productId.img}
                            onClick={()=>nav(`/shop/${product.productId._id}`)}
                            alt="product cover"
                        />
                        </div>
                        <div className="col">
                        <div className="row text-muted">{product.productId.category}</div>
                        <div className="row titleRow" onClick={()=>nav(`/shop/${product.productId._id}`)}>{product.productId.title}</div>
                        </div>
                        <div className="col quantityCol">
                        <Button variant="light" size="sm" onClick={e=>{dispatch(addToWishlist({productId:product.productId._id, quantity:-1}))}}>-</Button>
                        <span className="col">
                        {product.quantity}
                        </span>
                        <Button variant="light" size="sm" onClick={e=>{dispatch(addToWishlist({productId:product.productId._id, quantity:1}))}}>+</Button>
                        </div>
                        <div className="col priceCol">
                        {`${product.productId.price*(100-product.productId.discount)/100} TND `}
                        </div>
                        <div className="col priceCol" >
                        <Button size="sm" variant="light" style={{color:'red'}} className="" onClick={e=>{dispatch(removeWishlist({_id:product._id}))}}>Delete</Button>
                        </div>
                    </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </Offcanvas.Body>
        <footer>
            <Button
                variant="danger"
                className="productDetails-btn"
                style={{width:"95%"}}
                onClick={addToCartHandler}
            >
                <i className="bi bi-cart3" style={{ fontSize: "0.8rem" }}></i>{" "}
                Add to cart
            </Button>
        </footer>
      </Offcanvas>
    </div>
  );
};

export default WishlistSidebar;
