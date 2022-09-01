import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyOrderlist from "../components/MyOrderlist";
import { getCart } from "../slices/cartSlice";
import { getOrders } from "../slices/orderSlice";
import { getUserInfo } from "../slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getCart());
    dispatch(getOrders());
  }, []);
  const orderList = useSelector((state) => state.order.orderList);
  return (
    <div
      style={{
        paddingTop: "20px",
        minHeight: "70vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>User: {userInfo.username}</h1>
      <MyOrderlist orderList={orderList.filter(el=>el.status==='pending'|| el.status==='shipping')} title={"My pending order list"} />
      <MyOrderlist orderList={orderList.filter(el=>el.status==='fulfilled' || el.status==='rejected')} title={"Archived order list"} />
    </div>
  );
};

export default Profile;
