import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react'

import { ProductCard } from './ProductCard';

import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../../features/products/productSlice';

const FeaturedProducts = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <Flex
            justifyContent='space-evenly'
            flexWrap='wrap'
            p={0}
        >
            { products && products.map(product => <ProductCard key={ product._id } product={product} />) }
        </Flex>
    )
}

export default FeaturedProducts;
