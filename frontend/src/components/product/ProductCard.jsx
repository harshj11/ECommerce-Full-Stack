import React from 'react'

import {
    Button,
    Flex,
    Heading,
    Image,
    Text
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import ProductRating from './ProductRating';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`}>
            <Flex
                boxShadow='lg'
                borderRadius={6}
                flexDir='column'
                alignItems='flex-start'
                _hover={{
                    transform: 'scale(1.05)',
                    transition: 'transform 100ms ease-in-out',
                }}
                transition='all 100ms ease-in-out'
                my={4}
            >

                <Image
                    borderRadius={6}
                    objectFit='cover'
                    src={product.images[0].url}
                    alt={product.name}
                    width={['50rem', '16rem', '18.75rem', '21.875rem']}
                    height={56}
                />
                <Flex
                    p={2}
                    w='100%'
                >
                    <Flex
                        justify='space-between'
                        align='center'
                        py={2}
                        w='100%'
                    >
                        <Flex
                            flexDir='column'
                            maxWidth='10rem'
                        >
                            <Heading as='h3' size={['xs', 'sm', 'md']}>
                                {product.name}
                            </Heading>
                            <Text
                                color='orange.500'
                                fontWeight='bold'
                            >
                                ${product.price}
                            </Text>
                        </Flex>
                        <Flex
                            flexDir='column'
                            align='center'
                        >
                            <ProductRating rating={product.rating} />
                            <Text
                                color='gray'
                                fontSize={['sm', 'sm', 'md']}
                                fontWeight='semibold'
                            >
                                {product.numberOfReviews} Reviews
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Button
                    alignSelf='center'
                    colorScheme='orange'
                    my={4}
                    size='md'
                    w='80%'
                >
                    Add To Cart
                </Button>
            
            </Flex>
        </Link>
    )
}

export default ProductCard;