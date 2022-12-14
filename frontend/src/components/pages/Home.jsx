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
                    <Container
                        maxW='100vw'
                        px={[4, 4, 8, 12, 16]}
                        py={6}
                    >
                        <VStack mt={24}>
                            <Heading
                                as='h2'
                                size='lg'
                            >
                                Featured Products
                            </Heading>
                            <Container
                                maxW='100vw'
                                py={4}
                            >
                                <FeaturedProducts />
                            </Container>

                        </VStack>
                    </Container>
                )

        }
        </>
    )
}

export default Home;
