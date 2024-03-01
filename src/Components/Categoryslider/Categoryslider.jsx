import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { Grid } from 'react-loader-spinner';

export default function Categoryslider() {

  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  const { data, isLoading } = useQuery("categoryslider", getAllCategories, { refetchOnMount: false });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,

  };
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
    <div className='my-5 '>
      <Slider {...settings}>
        {data?.data.data.map(function (category, idx) {
          return <div key={idx}>
            <img style={{ width: "100%", height: "200px" }} src={category.image} />
            <h6 className='text-center mt-2 mb-2'>{category.name}</h6>
          </div>

        })}
      </Slider>
    </div>
  </>
}
