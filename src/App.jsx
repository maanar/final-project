import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
//import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
//import Categories from './Components/Categories/Categories'
import React, { Suspense, useContext } from 'react';
import Layout from './Components/Layout/Layout'
import  { UserContext } from './Context/UserContext';
import { useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import  { Toaster } from 'react-hot-toast';
import {Provider} from 'react-redux'
import {store} from './Rudex/Store.js'
import WhishList from './Components/WhishList/WhishList.jsx';
import ShippingAdress from './Components/ShippingAddress/ShippingAdress.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import SubCategory from './Components/SubCategory/SubCategory.jsx';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import ResetPassWord from './Components/ResetPassword/ResetPassWord.jsx';
import SubmitCode from './Components/SubmitCode/SubmitCode.jsx';
const Categories = React.lazy(()=> import('./Components/Categories/Categories.jsx'))
const Brands = React.lazy(()=> import('./Components/Brands/Brands'))
export default function App() {

  let routes = createBrowserRouter([
    { path: '/', element: <Layout />, children: [
      {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path:'Products' , element:<ProtectedRoute><Products/> </ProtectedRoute>},
      {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/> </ProtectedRoute>},
      //{path:'subcategory/:id' , element:<ProtectedRoute><SubCategory/> </ProtectedRoute>},
      {path:'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'Categories' , element: <Suspense fallback={<div>loading.....</div>}><ProtectedRoute><Categories/></ProtectedRoute></Suspense>},
      {path:'Brands' , element: <Suspense fallback={<div>loading.....</div>}><ProtectedRoute><Brands/></ProtectedRoute></Suspense>},
      {path:'allorders' , element: <ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'shippingaddress/:cartId' , element: <ProtectedRoute><ShippingAdress/></ProtectedRoute>},
      {path:'whishList' , element: <ProtectedRoute><WhishList/></ProtectedRoute>},
      {path:'Login' , element:<Login/> },
      {path:'Register' , element:<Register/>},
      {path:'forgetpassword' , element:<ForgetPassword/>},
      {path:'resetpassword' , element:<ResetPassWord/>},
      {path:'submitcode' , element:<SubmitCode/>},
    ] 
  }
  ])


  let {setUserToken} = useContext(UserContext);
 
  useEffect(()=> {
    if(localStorage.getItem('userToken')){
      setUserToken( localStorage.getItem('userToken'))
  
    }
  } , [])
  return <>
  <Provider store={store}>
  <RouterProvider router={routes}></RouterProvider>
    <Toaster/>
  </Provider>
  </>
}


