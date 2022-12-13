import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CategoryHeader = ({ displayText, path }) => {
    return (
        <Flex
            align='center'
            justify='space-between'
            backgroundColor='orange.400'
            borderRadius={6}
            color='white'
            marginBottom='1rem'
            p={2}
            position='sticky'
            top={24}
            zIndex={1}
        >
            <Text
                fontSize={['1.15rem', '1.25rem', '1.5rem']}
                fontWeight='bold'    
            >
                {displayText}
            </Text>
            {
                path && <Link to={`/products/${path}`}>
                            <Text fontWeight='bold'>See All</Text>
                        </Link>
            }
        </Flex>
    )
}

export default CategoryHeader;
