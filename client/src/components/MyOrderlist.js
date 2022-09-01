import React from "react";
import { MyOrderDetails } from "./MyOrderDetails";

const MyOrderlist = ({orderList, title}) => {


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
              {orderList.length===0 ? <div className="col">This list is empty!</div> : null}
              {orderList &&
                orderList.map((order) => (
                  <div className="row border-top border-bottom" key={order.serial}>
                    <div className="row main align-items-center">
                      <div className="col priceCol">
                        <div className="row text-muted">Serial: </div>
                        <div className="col titleRow"> {order.serial}</div>
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
                        <MyOrderDetails order={order}/>
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

export default MyOrderlist;
