// import React, { useEffect ,useState } from 'react'
// import axios from 'axios'
// import { Link } from "react-router-dom";
// import { useParams  } from 'react-router-dom'
// import Slider from "react-slick";
// import {Helmet} from "react-helmet";

// export default function SubCategory() {

  
//   const [ details , setDetails] = useState({}) 
//   const [ loading , setLoading] = useState(true) 


// let {id}=  useParams()
//  async function getSubCategory(id){
//   let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories/${id}`);
//    setDetails(data.data)
//    setLoading(false)
// }

// useEffect(()=>{
//   getSubCategory(id)
// } , [])



//   return <>
//    <h2 className='text-center py-4 text-main fw-bolder'>All SubCategory</h2>
//  <div className="container">
//   <div className="row g-4 mt-5 mb-5">
//     {details.data.data.map((Subcategory) =>(
//      <div className="col-md-4 " key={details._id}>
//          <h3 className='text-center fs-bolder text-main mt-4'>{details.name}</h3>
//      </div>

//     ))}
//   </div>
//  </div>
 
//   </>
// }
