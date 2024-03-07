import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useParams  } from 'react-router-dom'
import Slider from "react-slick";
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {


    var settings = {
        dots: true,
        autoplay:true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const [ details , setDetails] = useState({}) 
    const [ loading , setLoading] = useState(true) 


  let {id}=  useParams()
   async function getProductDetalies(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
     setDetails(data.data)
     setLoading(false)
  }

  let { addToCart } = useContext(CartContext);
  
  async function postToCart(id) {
    let { data } = await addToCart(id);
    if(data.status == 'success'){
        toast.success(data.message , {
            duration: 2000,
        })
    }
  }

  useEffect(()=>{
    getProductDetalies(id)
} , [])

  return <>
  
  <h2 className='text-center my-3 py-4 text-main fw-bolder'> Product Details </h2>
  
  {loading? 
  <div className='row justify-content-center align-items-center my-5 mt-5 gx-4'>
    <button  type='button' className='btn text-main '>
    <i className='fas fa-spinner fa-spin fa-5x load-main '></i>
  </button></div> :<>
  <Helmet>
                <meta charSet="utf-8" />
                <title>{details.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  
  <div className='container-lg my-5'>
<div className='row align-items-center '>
    <div className='col-md-4'>
          <Slider {...settings}>
     {details.images.map(image => <img src={image} alt={details.title}  key={details.id} className='rounded-3 w-100 ' />)}
    </Slider>
    </div>
    <div className='col-md-8 '>
                <h3 className='h5'>{details.title}</h3> 
                <p className='py-3'>{details.description}</p>
                <span className='font-sm text-main '>{details.category.name}</span>
                <div className='d-flex py-3 justify-content-between align-items-center'>
               
                    <span>{details.price} EGP</span>
                    <span><i className='fas fa-star rating-color me-1'></i>{details.ratingsAverage}</span>
            </div> 
            <button onClick={() => postToCart(details.id)} type='submit' className='btn bg-main text-light w-100 btn-sm'>Add to Cart</button>
    </div>
    
    </div></div>
  </>

}
  
  </>
}
