import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { cartContext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';

export default function Payment() {
  const { cartid, setNumOfcartitems, setTotalcartprice, setCartProducts } = useContext(cartContext);
  async function confirmPayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;

    const shippingAddress = {
      "shippingAddress": {
        "details": detailsValue,
        "phone": phoneValue,
        "city": cityValue
      }
    }
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`, shippingAddress, {
        headers: {
          token: localStorage.getItem("tkn")
        }
      });
      console.log(data);
      if (data.status === "success") {
        toast.success("Successful Order");
        setNumOfcartitems(0);
        setTotalcartprice(0);
        setCartProducts([]);
      } else {
        toast.error("Error in Create Order");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmonlinePayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;

    const shippingAddress = {
      "shippingAddress": {
        "details": detailsValue,
        "phone": phoneValue,
        "city": cityValue
      }
    }
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`, shippingAddress, {
        params: { url: "https://abdeldayem8.github.io/freshcartreactjs/#" },
        headers: { token: localStorage.getItem('tkn') }
      });
      window.open(data.session.url, "_blank");
    } catch (error) {
      console.log(error);
    }
  }
  return <>
    <div className='container py-5'>
      <form className='p-5'>
        <label htmlFor=''>Phone: </label>
        <input id='phone' type='tel' placeholder='Phone' className='mb-3 form-control' />

        <label htmlFor=''>City: </label>
        <input id='city' type='text' placeholder='City' className='mb-3 form-control' />

        <label htmlFor=''>Details: </label>
        <input id='details' type='text' placeholder='Details' className='mb-3 form-control' />

        <button type='button' onClick={confirmPayment} className='btn btn-outline-primary me-2'>Confirm Order</button>
        <button type='button' onClick={confirmonlinePayment} className='btn btn-outline-primary'>Confirm Online Payment</button>

      </form>
    </div>
  </>

}
