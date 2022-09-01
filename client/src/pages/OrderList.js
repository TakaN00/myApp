import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../slices/orderSlice";
import "../CSS/orderList.css"

import OrderlistComponent from "../components/OrderlistComponent";

const OrderList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const orderList = useSelector((state) => state.order.orderList);

  return (
    <div>

      <OrderlistComponent orderList={orderList.filter(el=>el.status ==="pending")} title={"Pending order list"}/>
      <OrderlistComponent orderList={orderList.filter(el=>el.status ==="shipping")} title={"Shipping order list"}/>
      <OrderlistComponent orderList={orderList.filter(el=>el.status ==="fulfilled")} title={"Fulfilled order list"}/>
      <OrderlistComponent orderList={orderList.filter(el=>el.status ==="rejected")} title={"Rejected order list"}/>

    </div>
  );
};

export default OrderList;
