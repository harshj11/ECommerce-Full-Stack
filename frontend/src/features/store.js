import { configureStore } from '@reduxjs/toolkit';

import productReducer from '../features/products/productSlice';
import uiReducer from '../features/ui/uiSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
    reducer: {
        data: productReducer,
        ui: uiReducer,
        user: userReducer,
    }
});