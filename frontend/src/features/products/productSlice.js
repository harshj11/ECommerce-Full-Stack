import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        productsCount: 0,
        errors: null
    },
    reducers: {
        loadingProducts: state => {
            state.loading = true;
        },
        setProducts: (state, { payload }) => {
            return {
                loading: false,
                products: payload.products,
                productsCount: payload.productCount,
                errors: null
            }
        },
        setErrors: (state, { payload }) => {
            return {
                loading: false,
                errors: payload
            }
        },
        clearErrors: (state, { payload }) => {
            return {
                ...state, 
                loading: false,
                errors: null
            }
        }
    }
});

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingProducts());
            const { data } = await axios.get('/api/v1/products');
            dispatch(setProducts(data));
        } catch(error) {
            dispatch(setErrors(error.response.data));
        }
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearErrors());
}

export const { loadingProducts, setProducts, setErrors } = productSlice.actions;
export default productSlice.reducer;