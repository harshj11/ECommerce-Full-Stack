import React from 'react'

import { Flex, Image, Text } from '@chakra-ui/react';
import ProductRating from './ProductRating';

const ProductReviewCard = ({ review }) => {
    return (
        <Flex
            border='solid 1px'
            borderColor='gray.200'
            boxShadow='lg'
            borderRadius={6}
            flexDir='column'
            minW='20rem'
            maxW={['20rem', '20rem', 'auto']}
            mx={2}
            mb={[8, 8, 0]}
            p={8}
        >
            <Flex 
                flexDir='column'
                justify='center'
                align='center'
            >
                <Image
                    borderRadius='50%'
                    height='2rem'
                    width='2rem'
                    src='https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                />
                <Text
                    fontSize='md'
                    fontWeight='bold'
                >
                    {review.name}
                </Text>
                <ProductRating rating={review.rating} />
            </Flex>
            <Text
                as='p'
                textAlign='justify'
            >
                {review.comment}
            </Text>
        </Flex>
    )
}

export default ProductReviewCard;