import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from "../slices/userSlice";
import {useNavigate} from 'react-router-dom'


const Register = () => {

    const nav = useNavigate()
    const dispatch = useDispatch()
    const {errors : userErrors, isAuth} = useSelector(state=>state.user)

    useEffect(()=>{
      if(isAuth) nav('/profile')
    },[isAuth])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitFnct = (data) => { 
        dispatch(registerUser(data))
     }

  return (
    <div className="registerForm">
      <Form onSubmit={handleSubmit(submitFnct)}>
      <h2>Sign Up for a Free Account</h2>
      <br/>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control {...register("username",{required: true, minLength: 4})} type="text" placeholder="Username" />
          {errors.username && <p className="alert-message">You must register a username with at least 4 characters</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control {...register("email",{required: true, pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          {errors.email && <p className="alert-message">Invalid email address</p>}
          {userErrors && <p>{userErrors}</p>}

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password",{required: true, minLength: 8})} type="password" placeholder="Password" />
          {errors.password && <p className="alert-message">Password must be at least 8 characters</p>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
