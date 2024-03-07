import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../Rudex/BrandsSlice';


export default function Brands() {

let {brands , isLoading} = useSelector(({brand}) => brand)

 let dispatch = useDispatch()
 useEffect(()=>{
  dispatch(getBrands())
 } ,[])
  return <>
  {isLoading ? <div className=" loading ">
      <button type="button" className="btn text-main ">
        <i className="fas fa-spinner fa-spin fa-5x load-main"></i>
      </button>
    </div> : <><h2 className='text-center py-4 text-main fw-bolder'>All Brands</h2>
     <div className="container">
    
    <div className="row mt-5 mb-5 g-3 ">
     {brands.map(brand => <div key={brand._id} className="product col-md-3 p-3">
     <img src={brand.image} className='w-100' alt={brand.name}/>
     <p className='text-center fw-bolder py-3'>{brand.name}</p>
     </div>)}
    
    </div>
  </div>
  </>}
  </>
}


