import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let user={
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:""
  }
 const [errmsg,seterrmsg]=useState(null);
 const [succmsg,setsuccmsg]=useState(null);
 const [isLoading,setisLoading] = useState(false);
  const navigateFunction = useNavigate();
async function registerUser(values){
  setisLoading(true);
  try{
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
    console.log(data);
    if(data.message === "success"){
      setsuccmsg("Account has Created Successfully");
      setTimeout(function(){
        navigateFunction('/login')
      },2000)
    }
  }
  catch(error){
    console.log(error);
    seterrmsg(error.response.data.message)
  }
  setisLoading(false);
}

const formikObject=  useFormik({
    initialValues:user,
    onSubmit: registerUser,
    validate: function(values){
  seterrmsg(null);

      const errors={};
      if(values.name.length < 4 || values.name.length > 20){
        errors.name = "Name Must be at least 4 characters to 20";
      }
      if(values.email.includes("@") === false || values.email.includes(".") === false){
        errors.email ="invalid email";
      }
      if(!values.phone.match(/^(02)?01[0125][0-9]{8}$/)){
        errors.phone="invalid Phone";
      }
      if(values.password.length <6 ){
        errors.password="Password Must Be at least 6 characters"
      }
      if(values.rePassword !== values.password ){
        errors.repassword="password and repassword should be match";
      }
      return errors;
    }
  });


  return (
    <>
   
    <div className='w-75 m-auto py-5'>

      {errmsg ? <div className='alert alert-danger'>{errmsg}</div> :""}
      {succmsg ? <div className='alert alert-success'>{succmsg}</div> :""}
      

      <h2>Register Now: </h2>
      <form onSubmit={formikObject.handleSubmit}>

        <label htmlFor='name'>Name:</label>
        <input id='name' onBlur={formikObject.handleBlur} onChange={formikObject.handleChange} value={formikObject.values.name}  type='text' placeholder='Name' className='form-control mb-3'/>
        
        {formikObject.errors.name && formikObject.touched.name ? <div className='alert alert-danger'>{formikObject.errors.name}</div> : ""}

        <label htmlFor='email'>Email:</label>
        <input onBlur={formikObject.handleBlur} onChange={formikObject.handleChange} value={formikObject.values.email} id='email' type='email' placeholder='Email' className='form-control mb-3'/>
        {formikObject.errors.email && formikObject.touched.email ? <div className='alert alert-danger'>{formikObject.errors.email}</div> : ""}

       
        <label htmlFor='phone'>Phone:</label>
        <input onBlur={formikObject.handleBlur} onChange={formikObject.handleChange} value={formikObject.values.phone} id='phone' type='tel' placeholder='Phone' className='form-control mb-3'/>
        {formikObject.errors.phone && formikObject.touched.phone ? <div className='alert alert-danger'>{formikObject.errors.phone}</div> : ""}
        
       
        <label htmlFor='password'>Password:</label>
        <input onBlur={formikObject.handleBlur} onChange={formikObject.handleChange} value={formikObject.values.password} id='password' type='password' placeholder='Password' className='form-control mb-3'/>
        {formikObject.errors.password && formikObject.touched.password ? <div className='alert alert-danger'>{formikObject.errors.password}</div> : ""}

       
        <label htmlFor='rePassword'>Repassword:</label>
        <input onBlur={formikObject.handleBlur} onChange={formikObject.handleChange} value={formikObject.values.rePassword} id='rePassword' placeholder='Repassword' type='password' className='form-control mb-3'/>
        {formikObject.errors.rePassword && formikObject.touched.rePassword ? <div className='alert alert-danger'>{formikObject.errors.rePassword}</div> : ""}
        
       
        <button disabled={formikObject.isValid ===false || formikObject.dirty==false} type='submit' className='btn btn-success'>
        {isLoading ?     <FallingLines
          color="#4fa94d"
          width="20"
          visible={true}
          ariaLabel='falling-lines-loading'
        /> :  "Register" }
       
        

       
        </button>
      </form>
      </div>
     
    </>
  )
}
