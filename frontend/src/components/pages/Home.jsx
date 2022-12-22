import React, { useEffect } from 'react'

import { Container, Heading, VStack } from '@chakra-ui/react';

import FeaturedProducts from '../product/FeaturedProducts';

import { useDispatch, useSelector } from 'react-redux';

import ErrorPage from '../layout/ErrorPage';
import { clearErrors } from '../../features/ui/uiSlice';

const Home = () => {
    const { errors } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrors());
    }, [dispatch]);

    return (
        <>
        {
            errors ? 
                <ErrorPage 
                    errorCode={errors.statusCode} 
                    errorText={(errors.statusCode === 500) ? errors.statusText + ', Please refresh or try again later' : errors.data.message}
                />
                : (
                    <VStack mt={24}
                        px={[4, 4, 8, 12]}
                    >
                        <Heading
                            as='h2'
                            size='lg'
                        >
                            Featured Products
                        </Heading>
                        <Container
                            maxW='100vw'
                        >
                            <FeaturedProducts />
                        </Container>
                    </VStack>
                )

        }
        </>
    )
}

export default Home;
