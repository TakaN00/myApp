import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AdminProtectedRoute = () => {

    const token = useSelector(state=>state.user.token)

  return (
    (token && jwt_decode(token).role == "admin") ? <Outlet/> : <Navigate to='/'/>
  )
}

export default AdminProtectedRoute