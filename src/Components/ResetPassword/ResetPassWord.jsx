import React, { useContext, useState } from 'react';
import * as Yup from 'yup'
import {useFormik} from 'formik';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';



export default function ResetPassWord() {


    const [ loading , setLoading] = useState(false) 
    const [ apiError , setApiError] = useState(false) 
    let navigate = useNavigate()
    let {setUserToken , setUserData} = useContext(UserContext)

    async function SubmitCodeUser(values){
        setLoading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` ,values)
        .catch((err) => {setApiError(err.response.data.message)

        setLoading(false)
      }) 
        
      setLoading(false)
      localStorage.setItem("userToken" , data.token)
      setUserToken(data.token)
      setUserData(data.user)
      console.log(data.user)
      navigate('/login')
        }
       


      let validationSchema = Yup.object({
   
        password: Yup.string().required('password is required').matches(/^[A-Z][\w]{5,8}$/ , 'invalid password ex(Manar123)'),
        
      
      })

  
      let formik = useFormik({
        initialValues : {
       
            password:'',
          
         
        },validationSchema
        , onSubmit:SubmitCodeUser
    })



  return(
    <div className='w-75 mx-auto py-4'>

    <h2 className='text-bolder'> Please Reset PassWord</h2>
    <form  onSubmit={formik.handleSubmit}>
     {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}
    
    
     <label htmlFor='password'>Password : </label> 
<input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' id="password" name='password' className='form-control mb-3'></input> 
{formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password} </div> : null}
    
    {loading ? <button  type='button' className='btn bg-main text-light'>
     <i className='fas fa-spinner fa-spin '></i>
     </button> :
     <button  disabled={!(formik.isValid && formik.dirty )} type='submit' className='btn bg-main text-light'>Reset Password</button>}
    
    </form>
       </div>
  )
}
