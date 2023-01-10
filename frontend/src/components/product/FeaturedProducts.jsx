import React, { useEffect } from 'react'
import { Container, Heading, Grid, GridItem } from '@chakra-ui/react';

import ProductCard from './ProductCard';

import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../../features/products/productSlice';

import Loading from '../layout/Loading';

const FeaturedProducts = () => {

    const dispatch = useDispatch();
    const { data, ui } = useSelector(state => state);

    const { loading } = ui;
    const { products } = data;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            {
                loading ? <Loading />
                    : (
                        <Container
                            maxW='100vw'
                            px={[4, 4, 8, 12, 16]}
                            py={[0, 2]}
                            mt={24}
                        >
                            <Heading
                                as='h2'
                                textAlign='center'
                                size='lg'
                            >
                                Featured Products
                            </Heading>
                            <Grid
                                gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                                gridRow='auto'
                                gap={['1rem', '1rem', '2rem']}
                                p={0}
                            >
                                {products && products.map(product =>
                                    <GridItem key={product._id}>
                                        <ProductCard product={product} />
                                    </GridItem>
                                )}
                            </Grid>
                        </Container>
                    )
            }
        </>
    )
}

export default FeaturedProducts;
