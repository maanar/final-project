import React from 'react'
import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import img1 from '../../Assets/images/grocery-banner.png'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
    var settings = {
        dots: false,
        autoplay:true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return <>
<div className="container">
    
    <div className="row mt-5 mb-5 gx-0">
      <div className="col-md-12">
     <Slider {...settings}>
     <img src={slide1} height={600} alt=''  className='w-100 ' />
     <img src={slide2}  height={600} alt=''  className='w-100 ' />
     <img src={slide3} height={600} alt=''  className='w-100 ' />
     </Slider>
      </div>
  
    </div>
  </div>

  </>
}
