import React from 'react'

import FeaturedProducts from '../product/FeaturedProducts';

import { useSelector } from 'react-redux';

import ErrorPage from '../layout/ErrorPage';

const Home = () => {
    const { errors } = useSelector(state => state.ui);
    return (
        <>
            {
                errors ?
                    <ErrorPage
                        errorCode={errors.statusCode}
                        errorText={(errors.statusCode === 500) ? errors.statusText + ', Please refresh or try again later' : errors.data.message}
                    />
                    : <FeaturedProducts />
            }
        </>
    )
}

export default Home;
