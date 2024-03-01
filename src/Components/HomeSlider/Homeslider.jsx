import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Homeslider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
      };
  return (
    <>
     
  
      <div className='w-100 m-auto'>
        
        <Slider {...settings}>
          <div>
           <img style={{width:"100%",height:"400px"}} src={require('../../images/1 (1).png')} />
          </div>
          <div>
          <img style={{width:"100%",height:"400px"}}  src={require('../../images/1 (2).jpg')} />
           
          </div>
          <div>
          <img style={{width:"100%",height:"400px"}}  src={require('../../images/1 (3).jpg')} />
          
          </div>
          
        </Slider>
      </div>
    
  
    </>
  )
}
