import React from 'react';
import styles from './Products.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

export default function Products() {
  return <>
  <h2 className='text-center py-4 text-main fw-bolder'> Products</h2>
   <FeaturedProducts></FeaturedProducts>
  </>
}
