import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageDetails from "../components/MessageDetails";
import { deleteMessage, getMessages } from "../slices/messageSlice";

import Button from "react-bootstrap/Button";
import "../CSS/messageList.css"

const MessageList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const messageList = useSelector((state) => state.message.messageList);

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
                      <b>Message List:</b>
                    </h4>
                  </div>
                </div>
              </div>
              {messageList &&
                Array.from(messageList).reverse().map((message) => (
                  <div
                    className="row border-top border-bottom"
                    key={message._id}
                  >
                    <div className="row main align-items-center">
                      <div className="col priceCol">
                        <div className="col message-note-box">
                            {message.consulted === false ? (<p className="message-consulted">New</p>) : message.important === true ? (<p className="message-important">Important</p>) : null}
                        </div>
                      </div>
                      <div className="col-md-4 priceCol">
                        <div className="row text-muted">Date:</div>
                        <div className="col titleRow">{message.date.split("GMT+0100 (UTC+01:00)")}</div>
                      </div>
                      <div className="col priceCol">
                        <div className="row text-muted">From:</div>
                        <div className="col">{message.name}</div>
                      </div>
                      <div className="col priceCol">
                        <div className="row text-muted">Subject:</div>
                        <div className="col">{message.subject}</div>
                      </div>
                      <div className="col quantityCol btnCol">
                        <MessageDetails message={message}/>
                        <Button
                          size="sm"
                          variant="light"
                          style={{ color: "red" }}
                          onClick={(e) => {
                            dispatch(deleteMessage(message._id));
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

export default MessageList;
