import { Button, Heading, Flex, Image, Text, Box } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { fetchProductById } from '../../features/products/productSlice';
import { clearErrors } from '../../features/ui/uiSlice';

import Loading from '../layout/Loading';

import ProductReviewCard from './ProductReviewCard';
import ProductRating from './ProductRating';

import ErrorPage from '../layout/ErrorPage';
import ItemCounter from '../layout/cart/ItemCounter';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(fetchProductById(id));
    }, [id, dispatch]);

    const [noOfItems, setNoOfItems] = useState(0);

    const { ui, data } = useSelector(state => state);
    const { errors } = ui;

    const { loading } = ui;
    const { product } = data;
    
    return (
        <>
            {
                loading ? <Loading /> 
                    :(
                        errors ? 
                            <ErrorPage 
                                errorCode={errors.statusCode} 
                                errorText={(errors.statusCode === 500) ? errors.statusText + ', Please refresh or try again later' : errors.data.message}
                            /> : (
                                <>
                                    <Flex
                                        flexDir={['column', 'column', 'row']}
                                        justify='flex-start'
                                        mt={['16', '16', '32']}
                                        mx='auto'
                                        width={['100%', '100%', '80%']}
                                    >
                                        <Image
                                            borderRadius={[0, 0, 6]}
                                            height={['18rem', '28rem', '25rem']}
                                            width={['100vw', '100vw', '25rem']}
                                            objectFit='cover'
                                            src={product.images && product.images[0].url}
                                        />
                                        <Flex
                                            flexDir='column'
                                            px={8}
                                            py={4}
                                            width={['100%', '100%', '70%']}
                                        >
                                            <Text
                                                color='orange.500'
                                                fontSize='0.9rem'
                                                fontWeight='bold'
                                                mt={[1, 1, 0]}
                                                textTransform='uppercase'
                                            >
                                                {product.category}
                                            </Text>
                                            <Heading
                                                as='h3'
                                                size='lg'
                                            >
                                                {product && product.name}
                                            </Heading>

                                            <Flex
                                                align='center'
                                                my={1}
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

                                            <Text
                                                as='p'
                                                color='#68707d'
                                                textAlign='justify'
                                            >
                                                {product.description}
                                            </Text>

                                            <Heading
                                                as='h4'
                                                my={4}
                                                size={['md']}
                                            >
                                                ${product.price}
                                            </Heading>

                                            {
                                                product.stock > 0
                                                    ? <Box
                                                        bgColor='green'
                                                        borderRadius={4}
                                                        color='white'
                                                        fontWeight='bold'
                                                        px={2}
                                                        py={1}
                                                        width='fit-content'
                                                    >
                                                        InStock
                                                    </Box>
                                                    : <Box
                                                        bgColor='red.500'
                                                        borderRadius={4}
                                                        color='white'
                                                        fontWeight='bold'
                                                        px={2}
                                                        py={1}
                                                        width='fit-content'
                                                    >
                                                        Out of Stock
                                                    </Box>
                                            }

                                            <Flex
                                                flexDir={['column', 'column', 'row']}
                                                mx={['auto', 'auto', 0]}
                                                my={8}
                                            >
                                                <ItemCounter 
                                                    width={['10rem', '23rem', '8rem']} 
                                                    noOfItems={noOfItems}
                                                    setNoOfItems={setNoOfItems}
                                                />
                                                
                                                <Button
                                                    colorScheme='orange'
                                                    height='3rem'
                                                    fontSize='1rem'
                                                    mt={['1rem', '1rem', 0]}
                                                    ml={[0, 0, '1rem']}
                                                    width={['10rem', '23rem', '8rem']}
                                                >
                                                    Add to cart
                                                </Button>

                                            </Flex>

                                            <Button
                                                alignSelf={['center', 'center', 'flex-start']}
                                                colorScheme='orange'
                                                height='3rem'
                                                fontSize='1rem'
                                                width={['10rem', '23rem', '8rem']}
                                            >
                                                Add Review
                                            </Button>

                                        </Flex>
                                    </Flex>
                                    <Flex
                                        flexDir='column'
                                    >
                                        <Heading
                                            mx='auto'
                                            my={4}
                                        >
                                            Reviews
                                        </Heading>
                                        <Flex
                                            flexDir={['column', 'column', 'row']}
                                            align={['center', 'center', 'inherit']}
                                            mx='auto'
                                            my={8}
                                            overflow='auto'
                                            width={['100%', '100%', '80%']}
                                        >
                                            {
                                                product.reviews ?
                                                    product.reviews.length > 0 ?
                                                        product.reviews.map(
                                                            (review, index) => <ProductReviewCard key={product._id + index} review={review} />
                                                        ) : <Text fontWeight='bold' mx='auto'>No Reviews Yet.</Text>
                                                    : null
                                            }
                                        </Flex>
                                    </Flex>
                                </>
                            )
                    )
            }
        </>
    )
}

export default ProductDetails;