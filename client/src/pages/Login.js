import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from "../slices/userSlice";
import {useNavigate} from 'react-router-dom'


const Login = () => {

    const nav = useNavigate()
    const dispatch = useDispatch()
    const {errors : userErrors, isAuth} = useSelector(state=>state.user)

    useEffect(()=>{
      if(isAuth) nav('/profile')
    },[isAuth])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitFnct = (data) => { 
        dispatch(loginUser(data))
     }

  return (
    <div className="registerForm">
      <Form onSubmit={handleSubmit(submitFnct)}>
      <h2>Sign In To Your Account</h2>
      <br/>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control {...register("email",{required: true, pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})} type="email" placeholder="Enter email" />
          {errors.email && <p className="alert-message">Invalid email address</p>}
          {userErrors?.includes('register') && <p>{userErrors}</p>}

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password",{required: true, minLength: 8})} type="password" placeholder="Password" />
          {errors.password && <p className="alert-message">Password must be at least 8 characters</p>}
        </Form.Group>
        {userErrors?.includes('password') && <p>{userErrors}</p>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
