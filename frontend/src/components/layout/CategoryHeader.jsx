import React from 'react';
import { Text } from '@chakra-ui/react';

const CategoryHeader = ({ displayText }) => {
    return (
        <Text
            backgroundColor='orange.400'
            borderRadius={6}
            color='white'
            fontSize={['1.15rem', '1.25rem', '1.5rem']}
            fontWeight='bold'
            p={2}
            position='sticky'
            top={24}
        >
            {displayText}
        </Text>
    )
}

export default CategoryHeader;
