import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";

export default function AllOrders() {
    let { getCartItem } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(null);
  
    async function getItems() {
        let { data } = await getCartItem();
        console.log(data);
        setLoading(false)
       
      }
    
    useEffect(() => {
        getItems();
      }, []);

  return <>  <div className=" container brder bg-main-light pt-5 mt-5 ">
    <h2 className="m-2 fw-bolder">Your Orders</h2>
    {loading ? (
          <div className="row loading mt-5">
            <button type="button" className="btn text-main ">
              <i className="fas fa-spinner fa-spin fa-5x load-main"></i>
            </button>
          </div>
        ) :  ""}
      </div>
      {/* <div className=" container brder bg-main-light pt-5 mt-5 ">
        <h2 className="m-2 fw-bolder">Your Orders</h2>
        {loading ? (
          <div className="row loading mt-5">
            <button type="button" className="btn text-main ">
              <i className="fas fa-spinner fa-spin fa-5x load-main"></i>
            </button>
          </div>
        ) :  (
          <>
          
            <p className="text-main ma-auto fw-bolder m-2 p-2">
            
              Total Price : {cart.totalCartPrice}
              <span className="text-dark fw-bolder"> EGP</span>
              
            </p>
            {cart.data.products.map(product => <div
                key={product.product.id}
                className="row m-2 p-2 m-0 border-1 border-bottom align-items-center"
              >
                <div className="col-md-2">
                  <div className="img p-2">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-100 "
                    />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="item">
                    <h3 className="h5 fw-bolder ">
                     
                      {product.product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <p className="text-main fw-bolder">
                     
                      Price : {product.price}
                      <span className="text-dark fw-bolder"> EGP</span>
                    </p>
                   
                  </div>
                </div>
               
              </div>
            )
            
            }
     
            </>
        ) }
      
      </div> */}
    </>
  
}
