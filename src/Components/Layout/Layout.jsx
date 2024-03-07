import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { Offline, Online } from "react-detect-offline"; 
export default function Layout() {
  return <>
  <Navbar/>
  <Offline><div className='loading h2 fw-bolder'>Only shown offline (surprise!)</div></Offline>
  <Outlet></Outlet>
  </>
}
