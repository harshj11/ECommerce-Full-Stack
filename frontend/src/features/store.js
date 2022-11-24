import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';

export default configureStore({
    reducer: {
        products: productReducer
    }
});