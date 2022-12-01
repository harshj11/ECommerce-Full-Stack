import { Flex, Text } from '@chakra-ui/react';
import React from 'react'
import { AiFillStar } from 'react-icons/ai';

const ProductRating = ({rating}) => {
    return (
        <Flex
            align='center'
            background='green'
            borderRadius={4}
            color='white'
            fontSize={['sm', 'sm', 'md']}
            fontWeight='bold'
            my={1}
            mr={2}
            px={2}
            py={1}
            w='fit-content'
        >
            <AiFillStar />
            <Text >{rating}</Text>
        </Flex>
    )
}

export default ProductRating;
