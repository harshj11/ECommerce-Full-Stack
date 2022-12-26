import React, { useState } from 'react'

import {
    Button,
    Flex,
    Heading,
    Image,
    Text
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import ProductRating from './ProductRating';
import ItemCounter from '../layout/cart/ItemCounter';

const ProductCard = ({ product }) => {

    const [noOfItems, setNoOfItems] = useState(0);

    return (
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
            <Link 
                to={`/product/${product._id}`}
                style={{
                    width: '100%'
                }}
            >
                <Image
                    borderRadius={6}
                    objectFit='cover'
                    src={product.images[0].url}
                    alt={product.name}
                    width='100%'
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

            </Link>

            <Flex
                alignSelf='center'
                flexDir={['column', 'column', 'row']}
                mx={['auto', 'auto', 0]}
                mb={4}
            >
                <ItemCounter width={['10rem', '7rem']} noOfItems={noOfItems} setNoOfItems={setNoOfItems} />
                <Button
                    colorScheme='orange'
                    height='3rem'
                    fontSize='1rem'
                    mt={['1rem', '1rem', 0]}
                    ml={[0, 0, '1rem']}
                    width={['10rem', '7rem']}
                >
                    Add To Cart
                </Button>

            </Flex>

        </Flex>
    )
}

export default ProductCard;