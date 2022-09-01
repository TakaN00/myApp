import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart, removeCart } from "../slices/cartSlice";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../CSS/cart.css";
import OrderCheckout from "../components/OrderCheckout";

const Cart = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const cart = useSelector((state) => state.cart.cartList);

  return (
    <div className="cart-container">
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
              </div>
            </div>
            {cart.length===0 ? <div className="col">Your cart is empty!</div> : null}
            {cart&&cart.filter(el=>el.quantity>0).map((product) => (
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
                  <Button variant="light" size="sm" onClick={e=>{dispatch(addToCart({productId:product.productId._id, quantity:-1}))}}>-</Button>
                  <span className="col">
                  {product.quantity}
                  </span>
                  <Button variant="light" size="sm" onClick={e=>{dispatch(addToCart({productId:product.productId._id, quantity:1}))}}>+</Button>
                </div>
                <div className="col priceCol">
                {`${product.productId.price*(100-product.productId.discount)/100} TND `}
                </div>
                <div className="col priceCol" >
                <Button size="sm" variant="light" style={{color:'red'}} className="" onClick={e=>{dispatch(removeCart({_id:product._id}))}}>Delete</Button>
                </div>
              </div>
            </div>
            ))}
            <div className="back-to-shop">
              <Button variant="light" className="text-muted" onClick={()=>nav("/shop")}><i className="bi bi-arrow-left" style={{fontSize:"0.8rem"}}></i> Back to shop</Button>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5 className="cartSummaryTitle">
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            {cart&&cart.filter(el=>el.quantity>0).map((product) => (
            <div className="row" key={product._id}>
              <div className="col" style={{ paddingLeft: "0", paddingRight: "20px"}}>
              - {product.productId.title}
              </div>
              <div className="col">{`${product.productId.price*product.quantity*(100-product.productId.discount)/100} TND `}</div>
            </div>
            ))}
            <br/>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col">{cart&&cart.filter(el=>el.quantity>0).reduce((total, currentValue) => total = total + currentValue.productId.price*currentValue.quantity*(100-currentValue.productId.discount)/100,0)} TND</div>
            </div>
            {cart.length!==0 ? <OrderCheckout/> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
