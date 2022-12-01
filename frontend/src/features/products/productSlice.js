import { createSlice } from '@reduxjs/toolkit';
import { setLoading, setLoadedSuccessfully, setErrors, clearErrors as clrErrors } from '../ui/uiSlice';

import axios from 'axios';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productsCount: 0,
        product: {}
    },
    reducers: {
        setProducts: (state, { payload }) => {
            return {
                products: payload.products,
                productsCount: payload.productCount,
                product: state.product
            }
        }, 
        setProduct: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                product: payload
            }
        }
    }
});

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading());
            const { data } = await axios.get('/api/v1/products');
            dispatch(setProducts(data));
            dispatch(setLoadedSuccessfully());
        } catch(error) {
            dispatch(setErrors(error.response.data));
        }
    }
}

export const fetchProductById = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading());
            const { data } = await axios.get(`/api/v1/product/${id}`);
            dispatch(setProduct(data.product));
            dispatch(setLoadedSuccessfully());
        } catch(error) {
            dispatch(setErrors(error.response.data));
        }
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clrErrors());
}

export const { loadingProducts, setProducts, setProduct } = productSlice.actions;
export default productSlice.reducer;