import React, { useContext, useState } from 'react';
import * as Yup from 'yup'
import {useFormik} from 'formik';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


export default function SubmitCode() {

const [ loading , setLoading] = useState(false) 
    const [ apiError , setApiError] = useState(false) 
    let navigate = useNavigate()
    let {setUserToken , setUserData} = useContext(UserContext)

    async function SubmitCodeUser(values){
        setLoading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` ,values)
        .catch((err) => {setApiError(err.response.data.message)

            toast.error(err.response.data.message , {
                duration: 2000,
            })
        setLoading(false)
      }) 
        if (data.status === 'Success'){
         
          toast.success('Correct Code' , {
            duration: 2000,
        })
        setLoading(false)
        
          navigate('/resetpassword')
        }
      }  


      let validationSchema = Yup.object({
   
        code: Yup.number().required('code is required'),
        
      
      })

  
   let formik = useFormik({
    initialValues : {
   
        resetCode : ''
     
    },validationSchema
    , onSubmit:SubmitCodeUser
})



  return (
    <div className='w-75 mx-auto py-4'>

    <h2 className='text-bolder'> Please enter your verfication code</h2>
    <form  onSubmit={formik.handleSubmit}>
     {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}
    
    
    <label htmlFor='code'></label> 
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='number' id="code" name='code' className='form-control mb-3'></input> 
    {formik.errors.code && formik.touched.code ? <div className='alert alert-danger py-2'>{formik.errors.code} </div> : null}
    
    {loading ? <button  type='button' className='btn bg-main text-light'>
     <i className='fas fa-spinner fa-spin '></i>
     </button> :
     <button  disabled={!(formik.isValid && formik.dirty )} type='submit' className='btn bg-main text-light'>Verify</button>}
    
    </form>
       </div>
  )
}
