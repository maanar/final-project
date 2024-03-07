import axios from "axios";
import { createContext } from "react";


 export let WhishContext =  createContext()

 export default function WhishContextProvider(props){
    let headers = {
        token: localStorage.getItem("userToken"),
      };

     function addtoWhishList(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
        {
          productId,
        },
        {
          headers,
        }
        )
        .then((response)=> response )
        .catch((err)=> err)
     }

     function getWhishItem(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
        {
          headers,
        }
        )
        .then((response)=> response )
        .catch((err)=> err)

     }

     function deleteWhishItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , 
        {
          headers,
        }
        )
        .then((response)=> response )
        .catch((err)=> err)

     }

     function updateWhishItem(productId , count){
        return axios
          .put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
              count
            },
            {
              headers,
            }
          )
          .then((response) => response)
          .catch((err) => err);
      }

     return <WhishContext.Provider value={{addtoWhishList , getWhishItem , deleteWhishItem ,updateWhishItem}}>
       { props.children}
     </WhishContext.Provider>

 }