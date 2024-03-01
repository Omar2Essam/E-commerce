import axios from 'axios';
import React from 'react'
import { Grid } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Category() {
  async function getAllCategories() {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return data;
  }
  const { isLoading, data } = useQuery("allbrands", getAllCategories);

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
    <div className='container py-5'>
      <div className='row g-4 mb-5 mt-3'>
        {data.data?.map(function (category, idx) {
          return <div key={idx} className='col-md-3'>
            <div className='category product '>
              <img className='w-100' style={{ height: '250px' }} src={category.image} alt={category.name} />
              <h5 className='text-center main-color'>{category.name}</h5>
            </div>
          </div>
        })}
      </div>
    </div>
  </>
}
