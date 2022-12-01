import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react'

import { ProductCard } from './ProductCard';

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
                        <Flex
                            justifyContent='space-evenly'
                            flexWrap='wrap'
                            p={0}
                        >
                            {products && products.map(product => <ProductCard key={product._id} product={product} />)}
                        </Flex>
                    )
            }
        </>
    )
}

export default FeaturedProducts;
