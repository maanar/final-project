import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'


export default function ShippingAdress() {
  let {checkOutSession} = useContext(CartContext)
  let {cartId}=  useParams()
  console.log(cartId)

   async function checkOut(values){
      let {data} = await checkOutSession(cartId ,values )
       console.log(data)
       if(data.status == 'success'){
         window.location.href = data.session.url
       }
    }

    let formik = useFormik({
        initialValues:{
            details: '',
            phone: '',
            city: ''
        },onSubmit : checkOut
    })
  return <>
 <div className='w-50 mx-auto py-4'>

<h2> Check Out</h2>
<form  onSubmit={formik.handleSubmit}>



<label htmlFor='details'>details : </label> 
<input onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' id="details" name='details' className='form-control mb-3'></input> 
{formik.errors.details && formik.touched.details ? <div className='alert alert-danger py-2'>{formik.errors.details} </div> : null}

<label htmlFor='phone'>phone : </label> 
<input onBlur={formik.handleBlur} onChange={formik.handleChange} type='tel' id="phone" name='phone' className='form-control mb-3'></input> 
{formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger py-2'>{formik.errors.phone} </div> : null}

<label htmlFor='city'>city : </label> 
<input onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' id="city" name='city' className='form-control mb-3'></input> 
{formik.errors.city && formik.touched.city ? <div className='alert alert-danger py-2'>{formik.errors.city} </div> : null}

<button className='btn bg-main text-light ' type='submit'>Check Out</button>

 
{/* {loading ? <button  type='button' className='btn bg-main text-light'>
 <i className='fas fa-spinner fa-spin '></i>
 </button> :
 <button disabled={!(formik.isValid && formik.dirty )} type='submit' className='btn bg-main text-light'>Login</button>}

 <Link className='ps-3' to={'/register'}> Register Now</Link> */}



</form>
   </div>
    
    </>
    
  
}
