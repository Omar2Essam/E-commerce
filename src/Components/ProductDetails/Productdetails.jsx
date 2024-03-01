import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Grid, CirclesWithBar } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';

export default function Productdetails() {

  const { addProductToCart } = useContext(cartContext);
  const { id } = useParams();
  const [sendingLoader, setSendingLoader] = useState(false);

  async function addProduct(id) {
    setSendingLoader(true);
    const res = await addProductToCart(id);

    if (res.status === "success") {
      toast.success(res.message, {
        duration: 2000
      });
    } else {
      toast.error("Error Happend");
    }
    setSendingLoader(false);
  }
  function getSpecificProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading } = useQuery("productdetails", getSpecificProduct);

  if (isLoading) {
    return <div className='vh-100 align-items-center d-flex justify-content-center'>
      <Grid
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  }
  return <>
    <div className="container p-5">
      <div className='row align-items-center py-5'>
        <div className='col-md-3'>
          <figure>
            <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
          </figure>
        </div>
        <div className='col-md-9'>
          <div className='details text-center'>
            <h2>{data.data.data.title}</h2>
            <p className='text-muted'>{data.data.data.description}</p>
            <h5>{data.data.data.price} EGP</h5>

            <button onClick={() => addProduct(data.data.data.id)} className='w-100 p-2 rounded-3 main-bg-color border-white text-white'>
              {sendingLoader ? <CirclesWithBar
                height="40"
                width="40"
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel='circles-with-bar-loading'
              /> : "+ Add To Cart"}


            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}
