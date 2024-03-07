import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { WhishContext } from '../../Context/WhishContext';
import { CartContext } from "../../Context/CartContext";

export default function WhishList() {
let {  getWhishItem , deleteWhishItem ,updateWhishItem } =useContext(WhishContext)

const [whishList, setWhishList] = useState(null);
const [loading, setLoading] = useState(true);

async function getItems(){
    setLoading(true)
    let {data} = await getWhishItem();
    console.log(data);
    setWhishList(data);
    setLoading(false);
}

async function deleteItems(id){
    setLoading(true);
    let {data} = await deleteWhishItem(id);
    console.log(data);
    getItems(data);
    setLoading(false);
}


async function updateItems(id , count) {
    if(count < 1){
     let { data } = await deleteWhishItem(id);
     setWhishList(data);
    }else{
      //setLoading(true);
      let { data } = await updateWhishItem(id ,count); 
      console.log(data);
      setWhishList(data);
      setLoading(false);
    }
  
   }

   let { addToCart } = useContext(CartContext);
  
   async function postToCart(id) {
     let { data } = await addToCart(id);
     if(data.status === 'success'){
         toast.success(data.message , {
             duration: 2000,
         })
     }
   }

   useEffect (() =>{
    getItems()
   },[])


  return  (
    <>
      <div className=" container brder bg-main-light pt-5 mt-5 ">
        <h2 className="m-2 fw-bolder h3">My Whish List</h2>
        {loading ? (
          <div className="row loading mt-5">
            <button type="button" className="btn text-main ">
              <i className="fas fa-spinner fa-spin fa-5x load-main"></i>
            </button>
          </div>
        ) : (
          <>{whishList.data.map((data) => (
              <div
                key={data._id}
                className="row m-2 p-2 m-0 border-1 border-bottom align-items-center"
              >
                <div className="col-md-2 col-lg-2">
                  <div className="img p-2">
                    <img
                      src={data.imageCover}
                      alt={data.title}
                      className="w-100 "
                    />
                  </div>
                </div>
                <div className="col-md-8 col-lg-8">
                  <div className="item">
                    <h3 className="h5 fw-bolder ">
                    {data.title}
                    </h3>
                    <p className="text-main fw-bolder">
                     
                      Price : {data.price}
                      <span className="text-dark fw-bolder"> EGP</span>
                    </p>
                    <button onClick={()=> deleteItems(data._id)} className="btn">
                      <i className="fas fa-trash-can text-danger"></i> Remove
                    </button>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="count">
                  <button onClick={() => postToCart(data.id)} className='brdr p-2 brder btn'>add To Cart</button>
                  </div>
                </div>
              </div>
            ))}
        
         </>
        )}
      </div>
    </>
  );
}
