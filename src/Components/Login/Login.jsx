import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import * as Yup from 'yup'
import {useFormik} from 'formik';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
 

  const [ loading , setLoading] = useState(false) 
  const [ apiError , setApiError] = useState(false) 
  let navigate = useNavigate()
  let {setUserToken} = useContext(UserContext)

 async function loginSubmit(values){
   setLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` ,values)
   .catch((err) => {setApiError(err.response.data.message);
   setLoading(false)
 }) 
   if(data.message == 'success'){
     setLoading(false)
     localStorage.setItem("userToken" , data.token)
     setUserToken(data.token)
     console.log(data.user.email)
     navigate('/')
   }
 }

 let validationSchema = Yup.object({
   
   email: Yup.string().required('email is required').email('invalid email'),
   password: Yup.string().required('password is required').matches(/^[A-Z][\w]{5,8}$/ , 'invalid password ex(Manar123)'),
 
 })

 let formik = useFormik({
     initialValues : {
    
       email:'',
       password:'',
      
     },validationSchema
     , onSubmit:loginSubmit
 })

 
 return <>
   <div className='w-75 mx-auto py-4'>

<h2> Login Now</h2>
<form  onSubmit={formik.handleSubmit}>
 {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}


<label htmlFor='email'>Email : </label> 
<input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' id="email" name='email' className='form-control mb-3'></input> 
{formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email} </div> : null}

<label htmlFor='password'>Password : </label> 
<input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' id="password" name='password' className='form-control mb-3'></input> 
{formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password} </div> : null}




{loading ? <button  type='button' className='btn bg-main text-light'>
 <i className='fas fa-spinner fa-spin '></i>
 </button> :
 <button disabled={!(formik.isValid && formik.dirty )} type='submit' className='btn bg-main text-light'>Login</button>}

 <Link className='ps-3 link' to={'/forgetpassword'}> forget your password ? </Link>



</form>
   </div>
 </>
}
