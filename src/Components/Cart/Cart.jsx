import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
//import styles from './Cart.module.css';

export default function Cart() {
  let { getCartItem ,deleteCartItem ,updateCartItem } = useContext(CartContext);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    let { data } = await getCartItem();
    console.log(data);
    setCart(data);
    setLoading(false);
  }

  async function deleteItems(id) {
   // setLoading(true);
    let { data } = await deleteCartItem(id);
    console.log(data);
    setCart(data);
    setLoading(false);
  }

  async function updateItems(id , count) {
   if(count < 1){
    let { data } = await deleteCartItem(id);
    setCart(data);
   }else{
     //setLoading(true);
     let { data } = await updateCartItem(id ,count); 
     console.log(data);
     setCart(data);
     setLoading(false);
   }
 
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className=" container brder bg-main-light pt-5 mt-5 ">
        <h2 className="m-2 fw-bolder">Cart Shop</h2>
        {loading ? (
          <div className="row loading mt-5">
            <button type="button" className="btn text-main ">
              <i className="fas fa-spinner fa-spin fa-5x load-main"></i>
            </button>
          </div>
        ) : cart ? (
          <>
          
            <p className="text-main ma-auto fw-bolder m-2 p-2">
            
              Total Price : {cart.data.totalCartPrice}
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
                    <button onClick={()=> deleteItems(product.product.id)} className="btn">
                      <i className="fas fa-trash-can text-danger"></i> Remove
                    </button>
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="count">
                    <button onClick={() => updateItems(product.product.id , product.count +1)} className="btn brdr p-1">+</button>
                    <span className="mx-2">{product.count}</span>
                    <button onClick={() => updateItems(product.product.id , product.count -1)} className="btn brdr p-1">-</button>
                  </div>
                </div>
              </div>
            )
            
            }
            <Link to={`/shippingaddress/${cart.data._id}`} className="btn bg-main text-light  m-3">Check out</Link> 
            </>
        ): <h2 className="text-center ">Cart is empty .......</h2> }
      
      </div>
    </>
  );
}
