import { configureStore } from '@reduxjs/toolkit';

import productReducer from '../features/products/productSlice';
import uiReducer from '../features/ui/uiSlice';

export default configureStore({
    reducer: {
        data: productReducer,
        ui: uiReducer
    }
});