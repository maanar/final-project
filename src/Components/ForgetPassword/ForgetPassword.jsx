import React, { useContext, useState } from 'react';
import * as Yup from 'yup'
import {useFormik} from 'formik';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function ForgetPassword() {

    const [ loading , setLoading] = useState(false) 
    const [ apiError , setApiError] = useState(false) 
    let navigate = useNavigate()
    let {setUserToken , setUserData} = useContext(UserContext)

    async function ForgetPassWordUser(values){
        setLoading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` ,values)
        .catch((err) => {setApiError(err.response.data.message);
            console.log(data)
            setLoading(false)
      }) 
      if(data.statusMsg === 'success'){
        setLoading(false)
        navigate('/submitcode')
      }
          
        
      }


   

      let validationSchema = Yup.object({
   
        email: Yup.string().required('email is required').email('invalid email'),
       // password: Yup.string().required('password is required').matches(/^[A-Z][\w]{5,8}$/ , 'invalid password ex(Manar123)'),
      
      })

  
 let formik = useFormik({
    initialValues : {
   
      email:'',
      
     
    },validationSchema
    , onSubmit:ForgetPassWordUser
})


  return (
    <div className='w-75 mx-auto py-4'>

    <h2 className='text-bolder'> Please enter your email</h2>
    <form  onSubmit={formik.handleSubmit}>
     {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}
    
    
    <label htmlFor='email'></label> 
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' id="email" name='email' className='form-control mb-3'></input> 
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email} </div> : null}
    
    {loading ? <button  type='button' className='btn bg-main text-light'>
     <i className='fas fa-spinner fa-spin '></i>
     </button> :
     <button  disabled={!(formik.isValid && formik.dirty )} type='submit' className='btn bg-main text-light'>Verify</button>}
    
    </form>
       </div>
  )
}
