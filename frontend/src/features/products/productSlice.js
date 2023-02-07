import { createSlice } from '@reduxjs/toolkit';
import { setLoading, setLoadedSuccessfully, setErrors, clearErrors } from '../ui/uiSlice';

import axios from 'axios';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productsByCategory: null,
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
        },
        setProductsByCategory: (state, { payload }) => {
            return {
                ...state,
                productsByCategory: {
                    ...state.productsByCategory,
                    [payload[1]] : [...payload[0].products],
                    [payload[1] + ' COUNT']: payload[0].productsCount,
                    [payload[1] + 'FILTERED COUNT']: payload[0].filteredProductsCount,
                },
                productsCount: payload.productCount,
            }
        }
    }
});

export const fetchProducts = (keyword = '', page = '1') => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading());
            const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${page}`);
            dispatch(setProducts(data));
            dispatch(clearErrors());
            dispatch(setLoadedSuccessfully());
        } catch(error) {
            dispatch(setErrors({
                data: error.response.data,
                statusCode: error.response.status,
                statusText: error.response.statusText
            }));
        }
    }
}

export const fetchProductById = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading());
            const { data } = await axios.get(`/api/v1/product/${id}`);
            dispatch(setProduct(data.product));
            dispatch(clearErrors());
            dispatch(setLoadedSuccessfully());
        } catch(error) {
            dispatch(setErrors({
                data: error.response.data,
                statusCode: error.response.status,
                statusText: error.response.statusText
            }));
        }
    }
}

export const fetchProductsByCategory = (category, page='1', prices=[0, 100000], rating=0) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading());
            const link = `/api/v1/products/${category}?page=${page}&price[gte]=${prices[0]}&price[lt]=${prices[1]}&rating[gte]=${rating}`
            const { data } = await axios.get(link);
            dispatch(setProductsByCategory([data, category]));
            dispatch(clearErrors());
            dispatch(setLoadedSuccessfully());
        } catch(error) {
            dispatch(setErrors({
                data: error.response.data,
                statusCode: error.response.status,
                statusText: error.response.statusText
            }));
        }

    }
}

export const { loadingProducts, setProducts, setProduct, setProductsByCategory } = productSlice.actions;
export default productSlice.reducer;