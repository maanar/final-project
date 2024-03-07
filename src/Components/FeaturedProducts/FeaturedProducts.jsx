import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import { WhishContext } from "../../Context/WhishContext";

export default function FeaturedProducts() {
  //const [products, setProducts] = useState([])
  //const [ loading , setLoading] = useState(true)

  // async function getProducts(){
  //     let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //     setProducts(data.data)
  //     setLoading(false)
  // }

  // useEffect(()=>{
  //     getProducts()
  // } , [])

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading, isError, isFetched } = useQuery(
    "featuredProduct",
    getProducts,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // refetchInterval:400000,
      refetchOnReconnect: false,
    }
  );

  let { addToCart } = useContext(CartContext);
  
  async function postToCart(id) {
    let { data } = await addToCart(id);
    if(data.status == 'success'){
        toast.success(data.message , {
            duration: 2000,
        })
    }
  }

  let {addtoWhishList} = useContext(WhishContext) ;

  async function postToWhishList(id) {
    let { data } = await addtoWhishList(id);
    if(data.status == 'success'){
        toast.success('item add successfuly', {
            duration: 2000,
        })
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="row loading mt-5">
          <button type="button" className="btn text-main ">
            <i className="fas fa-spinner fa-spin fa-5x load-main"></i>
          </button>
        </div>
      ) : (
        <div className="container">
          <div className="row gy-4">
          {data?.data.data.map((product) => (
            <div key={product.id} className="col-lg-3 ">
              <div className="product p-2">
                <Link className="link" to={`/productdetails/${product.id}`}>
                  <img
                    src={product.imageCover}
                    className="w-100"
                    alt={product.title}
                  />
                  <span className="font-sm text-main ">
                    {product.category.name}
                  </span>
                  <h3 className="h5">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex py-3 justify-content-between align-items-center">
                    <span>{product.price}</span>
                    <span>
                      <i className="fas fa-star rating-color me-1"></i>
                      {product.ratingsAverage}
                    </span>
                    
                  </div>
                </Link>
                <i onClick={() =>postToWhishList(product.id)} className="fa fa-heart fa-xl text-danger heart"></i>
                <button
                  onClick={() => postToCart(product.id)}
                  type="submit"
                  className="btn  bg-main text-light w-100 btn-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </>
  );
}
