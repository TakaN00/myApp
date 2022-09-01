import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateMessage } from "../slices/messageSlice";

const MessageDetails = ({ message }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register,
        handleSubmit,
        reset
      } = useForm({
        defaultValues: {
          consulted: true,
          important: message.important
        },
      });

    const submitFnct = (data) => {
        dispatch(updateMessage({ id: message._id, ...data }));
        handleClose();
        reset();
    };

  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow} size="sm" style={{padding:'4px 12px'}}>
          Read
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div>
              <h5>
                <b>Recived on:</b> {message.date}
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
                <div style={{ paddingLeft: "15px" }}>{message.name}</div>
              </div>
            </div>
            <div className="rowCheckout">
              <div
                className="col"
                style={{ paddingRight: "20px", paddingBottom: "20px" }}
              >
                <b>Email :</b>
                <br />

                <div style={{ paddingLeft: "15px" }}>{message.email}</div>
              </div>
            </div>
            <div className="rowCheckout">
              <div
                className="col"
                style={{ paddingRight: "20px", paddingBottom: "20px" }}
              >
                <b>Subject :</b>
                <br />
                <div style={{ paddingLeft: "15px" }}>{message.subject}</div>
              </div>
            </div>
              <div className="rowCheckout">
                <div
                  className="col"
                  style={{ paddingRight: "20px", paddingBottom: "20px" }}
                >
                  <b>Message :</b>
                  <br />
                  <div style={{ paddingLeft: "15px" }}>{message.message}</div>
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
                  <div style={{ paddingLeft: "15px" }} className="message-checkbox">
                    <Form.Group className="mb-3" controlId="formBasicImportant">
                      <Form.Check type="checkbox" label="Important" {...register("important")}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConsulted">
                      <Form.Check type="checkbox" label="Consulted" {...register("consulted")}/>
                    </Form.Group>
                  </div>
                </div>
              </div>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} type="submit">
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default MessageDetails;
