import React from 'react'
import axios from'axios'
import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import img1 from '../../Assets/images/grocery-banner.png'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'
import { useQuery } from "react-query";

export default function CategoriesSlider() {
    var settings = {
        dots: true,
        slidesToShow: 6,
        slidesToScroll: 1
      };

      function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

      }

   let {data}=useQuery( 'Categories' , getCategories)
  

  return <>
  <div className="container">
    
  <div className="row mt-5 mb-5 ">
   <Slider {...settings}>
   {data?.data.data.map(category => <div key={category._id} className="col-md-4">
   <img src={category.image} className='w-100' height={200} alt={category.name}/>
   <p>{category.name}</p>
   </div>)}
   
   </Slider>


  </div>
</div>

  </>
}
