import React from 'react';
import axios from'axios';
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

export default function Categories() {

  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }

let {data}=useQuery( 'Categories' , getCategories)


  return <>
  
  <h2 className='text-center py-4 text-main fw-bolder'>All Category</h2>
 <div className="container">
  <div className="row g-4 mt-5 mb-5">
    {data?.data.data.map((category) =>(
      <div className="product col-md-6 col-lg-3 mt-5 p-3">
        <Link className="link" to={`/subcategory/${category.id}`}>
      <img
                      src={category.image}
                      className="w-100"
                      alt={category.name}
                      height={400}
                    />
                    <h3 className='text-center fs-bolder text-main mt-4'>{category.name}</h3>
                    </Link>
      </div>

    ))}
  </div>
 </div>

  </>
}
