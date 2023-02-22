import { createSlice } from '@reduxjs/toolkit';
import { setLoading, setLoadedSuccessfully, setErrors, clearErrors } from '../ui/uiSlice';
import axios from 'axios';

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        user: {},
    }, 
    reducers : {
        setUserLoggedIn: (state, { payload }) => ({
            isAuthenticated: true, 
            user: payload,
        })
    }
})

export const loginUser = (email, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.post('/api/v1/login', { email, password }, config);
            dispatch(setUserLoggedIn(response.data));
            dispatch(clearErrors());
            dispatch(setLoadedSuccessfully());
        } catch(err) {
            dispatch(setErrors({
                data: err.response.data,
                statusCode: err.response.status,
                statusText: err.response.statusText
            }));
        }
    }
}

export const registerUser = (name, email, password, avatar) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading());
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post('/api/v1/register', {
                name, email, password, avatar
            }, config);
            dispatch(setUserLoggedIn(response.data));
            dispatch(clearErrors());
            dispatch(setLoadedSuccessfully());
        } catch(err) {
            dispatch(setErrors({
                data: err.response.data,
                statusCode: err.response.status,
                statusText: err.response.statusText
            }));
        }
    }
}

const { setUserLoggedIn } = userSlice.actions;
export default userSlice.reducer;