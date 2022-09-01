import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateOrder } from "../slices/orderSlice";

export const OrderDetails = ({ order }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      status: order.status,
    },
  });

  const submitFnct = (data) => {
    dispatch(updateOrder({ id: order._id, ...data }));
    handleClose();
  };

  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow} size="sm">
          Details
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order n:{order.serial}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>
              <b>Product list</b>
            </h5>
            <hr />
            {order.products.map((product) => (

                <div className="rowCheckout" key={product._id}>
                  <div
                    className="col"
                    style={{ paddingLeft: "0", paddingRight: "20px" }}
                  >
                    - {product.productId.category} {product.productId.title} x{" "}
                    {product.quantity}
                  </div>
                  <div className="col text-right-checkout">{`${
                    (product.productId.price *
                      product.quantity *
                      (100 - product.productId.discount)) /
                    100
                  } TND `}</div>
                </div>

            ))}
            <br />
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
              <div className="col text-right-checkout">{order.amount} TND</div>
            </div>
            <hr />
            <div>
              <h5>
                <b>Delivery details</b>
              </h5>
            </div>
            <hr />
            <div className="rowCheckout">
              <div
                className="col"
                style={{ paddingRight: "20px", paddingBottom: "20px" }}
              >
                <b>Name :</b>
                <br />
                <div style={{ paddingLeft: "15px" }}>
                  {order.owner.username}
                </div>
              </div>
            </div>
            <div className="rowCheckout">
              <div
                className="col"
                style={{ paddingRight: "20px", paddingBottom: "20px" }}
              >
                <b>Address :</b>
                <br />

                <div style={{ paddingLeft: "15px" }}>
                  {order.address}, {order.gouvernorat}
                </div>
              </div>
            </div>
            <div className="rowCheckout">
              <div
                className="col"
                style={{ paddingRight: "20px", paddingBottom: "20px" }}
              >
                <b>Phone :</b>
                <br />
                <div style={{ paddingLeft: "15px" }}>{order.phone}</div>
              </div>
            </div>
            <Form onSubmit={handleSubmit(submitFnct)}>
              <div className="rowCheckout">
                <div
                  className="col"
                  style={{ paddingRight: "20px", paddingBottom: "20px" }}
                >
                  <b>Status :</b>
                  <br />
                  <div style={{ paddingLeft: "15px" }}>
                    <Form.Group className="mb-3" controlId="formBasicCategory">
                      <Form.Select {...register("status")}>
                        <option value="pending">Pending</option>
                        <option value="shipping">Shipping</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="rejected">Rejected</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
              </div>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose} type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};
