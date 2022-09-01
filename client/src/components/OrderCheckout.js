import React, { useState } from 'react';
import "../CSS/checkout.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../slices/orderSlice';
import { deleteCart } from '../slices/cartSlice';

const OrderCheckout = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart.cartList);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitFnct = (data) => { 
        dispatch(createOrder({...data,cartList:cart}));
        dispatch(deleteCart())
        handleClose();
     }

  return (
    <>
      <Button variant="light" className="btnCheckOut" onClick={handleShow}>
        CHECKOUT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Check out</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(submitFnct)} className="checkout-form">
        <Modal.Body>
            <div>
                    <h5>
                        <b>Summary</b>
                    </h5>
            </div>
                <hr />
                {cart&&cart.filter(el=>el.quantity>0).map((product) => (
            <div className="rowCheckout" key={product._id}>
              <div className="col" style={{ paddingLeft: "0", paddingRight: "20px"}}>
                - {product.productId.category} {product.productId.title} x {product.quantity}
              </div>
              <div className="col text-right-checkout">{`${product.productId.price*product.quantity*(100-product.productId.discount)/100} TND `}</div>
            </div>
            ))}
            <br/>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "1vh 0",
              }}
            >
              <div className="col">Delivery fees</div>
              <div className="col text-right-checkout">7 TND</div>
            </div>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0 0 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right-checkout">{cart&&cart.filter(el=>el.quantity>0).reduce((total, currentValue) => total = total + currentValue.productId.price*currentValue.quantity*(100-currentValue.productId.discount)/100,7)} TND</div>
              <Form.Control hidden {...register("amount")} type="number" defaultValue={cart&&cart.filter(el=>el.quantity>0).reduce((total, currentValue) => total = total + currentValue.productId.price*currentValue.quantity*(100-currentValue.productId.discount)/100,7)} />
            </div>
        </Modal.Body>
        <Modal.Body>
            <hr/>
            <div>
              <h5>
                <b>Delivery details</b>
              </h5>
            </div>
            <hr />

            <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>Gouvernorat</Form.Label>
            <Form.Select {...register("gouvernorat",{required: true})} placeholder="gouvernorat" defaultValue={'DEFAULT'}>
            <option value ="DEFAULT" disabled hidden>Gouvernorat</option>
            <option value="Ariana">Ariana</option>
            <option value="Beja">Béja</option>
            <option value="Ben Arous">Ben Arous</option>
            <option value="Bizerte">Bizerte</option>
            <option value="Gabes">Gabès</option>
            <option value="Gafsa">Gafsa</option>
            <option value="Jendouba">Jendouba</option>
            <option value="Kairouan">Kairouan</option>
            <option value="Kasserine">Kasserine</option>
            <option value="Kebili">Kébili</option>
            <option value="Kef">Kef</option>
            <option value="Mahdia">Mahdia</option>
            <option value="Manouba">Manouba</option>
            <option value="Medenine">Médenine</option>
            <option value="Monastir">Monastir</option>
            <option value="Nabeul">Nabeul</option>
            <option value="Sfax">Sfax</option>
            <option value="Sidi Bouzid">Sidi Bouzid</option>
            <option value="Siliana">Siliana</option>
            <option value="Sousse">Sousse</option>
            <option value="Tataouine">Tataouine</option>
            <option value="Tozeur">Tozeur</option>
            <option value="Tunis">Tunis</option>
            <option value="Zaghouan">Zaghouan</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control {...register("address",{required: true})} type="text" placeholder="Address" />
            {errors.address && <p className="alert-message">You need to provide a valid address</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control {...register("phone",{required: true, minLength: 8})} type="number" placeholder="Phone number" />
            {errors.phone && <p className="alert-message">You need to provide a valid phone number</p>}
            </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" type="submit" className="btnCheckOutSubmit">
            Submit order
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default OrderCheckout