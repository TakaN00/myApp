import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux'

import "../CSS/contact.css"
import { newMessage } from "../slices/messageSlice";

const Contact = () => {

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitFnct = (data) => { 
    dispatch(newMessage(data))
    setShow(true)
    reset()
 }

 const [show, setShow] = useState(false);

  return (
    <div className="cart-container">
      <div className="card">
        <div className="row">
          <div className="col-md-8 contact">
            <Form onSubmit={handleSubmit(submitFnct)}>
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Get In Touch</b>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="row border-top border-bottom">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <div className="row" style={{ paddingTop: "2vh" }}>
                    <div className="col">
                      <div className="row" style={{ paddingLeft: "5px" }}>
                        <Form.Control
                          {...register("name", { required: true })}
                          type="text"
                          placeholder="Name"
                        />
                        {errors.name && <p className="alert-message">Please enter your name</p>}
                      </div>
                    </div>
                    <div className="col">
                      <div style={{ paddingLeft: "5px" }}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            {...register("email", { required: true }, {required: true, pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})}
                            type="email"
                            placeholder="Email"
                          />
                          {errors.email && (
                            <p className="alert-message" style={{ paddingLeft: "15px" }}>Please enter a valid email address</p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSubject">
                  <div className="row">
                    <div className="col">
                      <div className="row" style={{ paddingLeft: "5px" }}>
                        <Form.Control
                          {...register("subject", { required: true })}
                          type="text"
                          placeholder="Subject"
                        />
                        {errors.subject && <p className="alert-message">Please enter the subject</p>}
                      </div>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicMessage">
                  <div className="row">
                    <div className="col">
                      <div className="row" style={{ paddingLeft: "5px" }}>
                        <Form.Control
                          {...register("message", { required: true })}
                          type="text"
                          as="textarea"
                          rows={8}
                          placeholder="Message"
                        />
                        {errors.message && <p className="alert-message">Please enter a message</p>}
                      </div>
                    </div>
                  </div>
                </Form.Group>
              </div>
              <div className="main">
                <Button variant="dark" type="submit" style={{whiteSpace: "nowrap"}}>
                  Send Message
                </Button>
              </div>
            </Form>
          </div>

          <div className="col-md-4 summary">
            <div>
              <h5 className="cartSummaryTitle">
                <b>Contact Us</b>
              </h5>
            </div>

            <div className="row border-top border-bottom">
              <div className="row main">
                <div className="col-2">
                  <i
                    className="bi bi-geo-alt"
                    style={{ fontSize: "2.2em" }}
                  ></i>
                </div>
                <div className="col">
                  <div className="row titleRow">Address:</div>
                  <div className="row" style={{ paddingLeft: "5px" }}>
                    12 address test exemple
                  </div>
                </div>
              </div>
              <div className="row main">
                <div className="col-2">
                  <i
                    className="bi bi-telephone"
                    style={{ fontSize: "2.2em" }}
                  ></i>
                </div>
                <div className="col">
                  <div className="row titleRow">Phone:</div>
                  <div className="row" style={{ paddingLeft: "5px" }}>
                    (+216) 50 123 565
                  </div>
                </div>
              </div>
              <div className="row main">
                <div className="col-2">
                  <i
                    className="bi bi-envelope"
                    style={{ fontSize: "2.2em" }}
                  ></i>
                </div>
                <div className="col">
                  <div className="row titleRow">Email:</div>
                  <div className="row" style={{ paddingLeft: "5px" }}>
                    AnG-shop@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
            className="p-3 success position-absolute" 
            position='bottom-center' 
            style={{zIndex:2}}
        >
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            autohide
            bg="light"
          >
            <Toast.Header>
              <strong className="me-auto">A&G</strong>
              <small>Now</small>
            </Toast.Header>
            <Toast.Body style={{textAlign: 'center'}}>
              Your message has been successfully sent
            </Toast.Body>
          </Toast>
        </ToastContainer>
    </div>
  );
};

export default Contact;
