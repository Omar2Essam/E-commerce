import axios from 'axios'
import React from 'react'
import { Grid } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Brands() {

  async function getAllBrands() {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    return data;
  }
  const { isLoading, data } = useQuery("allbrands", getAllBrands);

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
    <div className='container py-5 '>
      <div className='row g-4 mt-3 mb-5'>
        {data.data?.map(function (brand, idx) {
          return <div key={idx} className='col-md-3'>
            <div className='brand product'>
              <img src={brand.image} alt={brand.name} className='w-100' />
              <h5 className='text-center main-color'>{brand.name}</h5>
            </div>
          </div>
        })}
      </div>
    </div>
  </>
}
