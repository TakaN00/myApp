import React from "react";
import { deleteOrder } from "../slices/orderSlice";
import Button from "react-bootstrap/Button";

import { OrderDetails } from "../components/OrderDetails";
import { useDispatch } from "react-redux";

const OrderlistComponent = ({orderList, title}) => {

    const dispatch = useDispatch();

  return (
    <div>

      <div className="orderList-container">
        <div className="card">
          <div className="row">
            <div className="col-md-12 orderList">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>{title}:</b>
                    </h4>
                  </div>
                </div>
              </div>
              {orderList.length==0 ? <div className="col">This list is empty!</div> : null}
              {orderList &&
                orderList.map((order) => (
                  <div className="row border-top border-bottom" key={order.serial}>
                    <div className="row main align-items-center">
                      <div className="col priceCol">
                        <div className="row text-muted">Serial: </div>
                        <div className="col titleRow"> {order.serial}</div>
                      </div>
                      <div className="col priceCol">
                        <div className="row text-muted">Username:</div>
                        <div className="col"> {order.owner.username}</div>
                      </div>
                      <div className="col priceCol">
                        <div className="row text-muted">Amount:</div>
                        <div className="col"> {order.amount}</div>
                      </div>
                      <div className="col priceCol">
                        <div className="row text-muted">Status:</div>
                        <div className="col"> {order.status}</div>
                      </div>
                      <div className="col quantityCol btnCol">
                        <OrderDetails order={order} />
                        <Button
                          size="sm"
                          variant="light"
                          style={{ color: "red" }}
                          onClick={(e) => {
                            dispatch(deleteOrder(order._id));
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default OrderlistComponent;
