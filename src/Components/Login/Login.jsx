import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/authantication";

export default function Login() {
  const { token, setToken } = useContext(AuthContext);

  let user = {

    email: "",
    password: ""
  }
  const [errmsg, seterrmsg] = useState(null);
  const [succmsg, setsuccmsg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigateFunction = useNavigate();
  async function logoinUser(values) {

    setisLoading(true);
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      console.log(data.token);
      if (data.message === "success") {
        localStorage.setItem('tkn', data.token)
        setToken(data.token)
        setsuccmsg("Welcome");
        setTimeout(function () {
          navigateFunction('/products')
        }, 1000)
      }
    }
    catch (error) {

      seterrmsg(error.response.data.message)
    }
    setisLoading(false);
  }

  const formikObject = useFormik({
    initialValues: user,
    onSubmit: logoinUser,
    validate: function (values) {
      seterrmsg(null);

      const errors = {};

      if (values.email.includes("@") === false || values.email.includes(".") === false) {
        errors.email = "invalid email";
      }

      if (values.password.length < 6) {
        errors.password = "Password Must Be at least 6 characters"
      }

      return errors;
    }
  });



  return (
    <>
      <div className='w-75 m-auto py-5'>

        {errmsg ? <div className='alert alert-danger'>{errmsg}</div> : ""}
        {succmsg ? <div className='alert alert-success'>{succmsg}</div> : ""}


        <h2>Login: </h2>
        <form onSubmit={formikObject.handleSubmit}>


          <label htmlFor='email'>Email:</label>
          <input onBlur={formikObject.handleBlur} onChange={formikObject.handleChange} value={formikObject.values.email} id='email' type='email' placeholder='Email' className='form-control mb-3' />
          {formikObject.errors.email && formikObject.touched.email ? <div className='alert alert-danger'>{formikObject.errors.email}</div> : ""}




          <label htmlFor='password'>Password:</label>
          <input onBlur={formikObject.handleBlur} onChange={formikObject.handleChange} value={formikObject.values.password} id='password' type='password' placeholder='Password' className='form-control mb-3' />
          {formikObject.errors.password && formikObject.touched.password ? <div className='alert alert-danger'>{formikObject.errors.password}</div> : ""}




          <button disabled={formikObject.isValid === false || formikObject.dirty === false} type='submit' className='btn btn-success me-1'>
            {isLoading ? <FallingLines
              color="#4fa94d"
              width="20"
              visible={true}
              ariaLabel='falling-lines-loading'
            /> : "Login"}
          </button>
          <Link to="/forgetpass"><span className='text-main'>Forget Password</span></Link>
        </form>
      </div>
    </>
  )
}

