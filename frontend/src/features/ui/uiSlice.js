import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        loading: false,
        errors: null
    },
    reducers: {
        setLoading: state => {
            state.loading = true;
        },
        setLoadedSuccessfully: state => {
            state.loading = false;
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

export const { setLoading, setLoadedSuccessfully, setErrors, clearErrors} = uiSlice.actions;
export default uiSlice.reducer;