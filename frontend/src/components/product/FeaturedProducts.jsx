import { Flex } from '@chakra-ui/react';
import React from 'react'

import { ProductCard } from './ProductCard';

const FeaturedProducts = () => {
    return (
        <Flex
            justifyContent='space-evenly'
            flexWrap='wrap'
            p={0}
        >
            <ProductCard product={{ _id: 1, name: "Shirt Men" }} />
            <ProductCard product={{ _id: 2, name: "Shirt Men" }} />
            <ProductCard product={{ _id: 3, name: "Shirt Men" }} />
            <ProductCard product={{ _id: 4, name: "Shirt Men" }} />
            <ProductCard product={{ _id: 5, name: "Shirt Men" }} />
            <ProductCard product={{ _id: 6, name: "Shirt Men" }} />
            <ProductCard product={{ _id: 7, name: "Shirt Men" }} />
            <ProductCard product={{ _id: 8, name: "Shirt Men" }} />
            <ProductCard product={{ _id: 9, name: "Shirt Men" }} />
            
        </Flex>
    )
}

export default FeaturedProducts;
