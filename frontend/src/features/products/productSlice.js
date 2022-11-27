import { createSlice } from '@reduxjs/toolkit';
import { setErrors, clearErrors as clrErrors } from '../ui/uiSlice';

import axios from 'axios';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        productsCount: 0,
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
    dispatch(clrErrors());
}

export const { loadingProducts, setProducts } = productSlice.actions;
export default productSlice.reducer;