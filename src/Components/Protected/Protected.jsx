import React, { useContext } from 'react'

import { AuthContext } from '../../Context/authantication'

import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({children}) {

  const {token} =  useContext(AuthContext);
  
  if(localStorage.getItem('tkn') === null){
    return <>
     <Navigate to="/login"/>
    </>
  }
  return (
    <>
     {children}
    </>
  )
}
