import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
    name: 'errors',
    initialState: {
        loading: false,
        errors: null
    },
    reducers: {
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

export const { setErrors, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;