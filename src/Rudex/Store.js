
import {configureStore} from '@reduxjs/toolkit'
import {CounterReducer} from  './CounterSlide'
import { brandsReducer } from './BrandsSlice.js'


export let store = configureStore({
    reducer:{
        counter : CounterReducer ,
        brand : brandsReducer,

    }
})
