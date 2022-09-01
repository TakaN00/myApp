import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "../slices/userSlice";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const userList = useSelector((state) => state.user.userList);

  return (
    <div>
      <div className="orderList-container">
        <div className="card">
          <div className="row">
            <div className="col-md-12 orderList">
              <div className="title">
                <div className="row">
                  <div className="col ">
                    <h4>
                      <b>User List:</b>
                    </h4>
                  </div>
                </div>
              </div>
              {userList &&
                userList.map((user) => (
                  <div className="row border-top border-bottom" key={user._id}>
                    <div className="row main align-items-center">
                      <div className="col priceCol">
                        <div className="row text-muted">Username: </div>
                        <div className="col titleRow">{user.username}</div>
                      </div>
                      <div className="col priceCol">
                        <div className="row text-muted">Email:</div>
                        <div className="col">{user.email}</div>
                      </div>
                      <div className="col-md-4 priceCol">
                        <div className="row text-muted">Subscription date:</div>
                        <div className="col titleRow">{user.subdate?.split("GMT+0100 (UTC+01:00)")}</div>
                      </div>
                      <div className="col quantityCol btnCol" style={{ display : "flex"}}>
                        {user.role === "customer" ? 
                        <Button
                          size="sm"
                          variant="light"
                          style={{ color: "red" , margin:"0 auto"}}
                          onClick={(e) => {
                            dispatch(deleteUser(user._id));
                          }}
                        >
                          Delete
                        </Button>
                        : null}
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

export default UserList;
