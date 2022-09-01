import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const MyOrderDetails = ({ order }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow} size="sm" style={{whiteSpace: "nowrap"}}>
          Order details
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
            <div className="rowCheckout">
              <div
                className="col"
                style={{ paddingRight: "20px", paddingBottom: "20px" }}
              >
                <b>Status :</b>
                <br />
                <div style={{ paddingLeft: "15px" }}>{order.status}</div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};
