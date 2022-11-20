import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        loadingProducts: state => {
            return {
                loading: true,
                products: []
            }
        },
        setProducts: (state, { payload }) => {
            return {
                loading: false,
                products: payload.products,
                productsCount: payload.productCount
            }
        },

    }
});

export const { loadingProducts, setProducts } = productSlice.actions
export default productSlice.reducer;