import React, { useEffect } from 'react';
import { Container, Grid, GridItem, Text } from '@chakra-ui/react';
import { fetchProducts } from '../../features/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from '../layout/Loading';
import ProductCard from '../product/ProductCard';

import ErrorPage from '../layout/ErrorPage';

const SearchProducts = () => {

    const { keyword } = useParams();
    const dispatch = useDispatch();
    const { data, ui } = useSelector(state => state);
    const { errors, loading } = ui;
    const { products } = data;

    useEffect(() => {
        dispatch(fetchProducts(keyword));
    },[dispatch, keyword]);

    return (
        <>
            {
                errors ? 
                    <ErrorPage 
                        errorCode={errors.statusCode}
                        errorText={(errors.statusCode === 500) ? errors.statusText + ', Please refresh or try again later' : errors.data.message}
                    />
                    : ( 
                        loading ?   
                        <Loading /> :
                        <Container
                            maxW='100vw'
                            px={[4, 4, 8, 12, 16]}
                            py={[0, 2]}
                            mt={24}
                        >
                            <Grid
                                gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                                gridRow='auto'
                                gap={['1rem', '1rem', '2rem']}
                                p={0}
                            >
                                {
                                    products.length === 0 ? 
                                        <Text
                                            textColor='orange.500'
                                            fontSize={['lg', 'x-large']}
                                            fontWeight='bold'
                                            position='absolute'
                                            left='50%'
                                            transform='translateX(-50%)'
                                        >
                                            Sorry, no products found!
                                        </Text>
                                        : (
                                            products && products.map(product =>
                                            <GridItem key={product._id}>
                                                <ProductCard product={product} />
                                            </GridItem>
                                        )
                                    )
                                }
                            </Grid>
                        </Container>
                    )
            }
        </>
    )
}

export default SearchProducts;
