import { Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react'

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
        if(!products || products.length === 0)
            dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            {
                loading ? <Loading />
                    : (
                        <Grid
                            gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)' ,'repeat(3, 1fr)']}
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
                    )
            }
        </>
    )
}

export default FeaturedProducts;
