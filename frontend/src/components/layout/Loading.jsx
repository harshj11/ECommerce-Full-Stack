import React from 'react'

import { keyframes, Box, Text, Flex } from '@chakra-ui/react';

const loadingAnimation = keyframes`
    50% {
        transform: translateY(1rem);
    }
`;

const dotStyles = {
    backgroundColor: '#FF7D1A',
    borderRadius: '50%',
    display: 'inline-block',
    height: '20px',
    width: '20px'
}

const Loading = () => {
    return (
        <Flex 
            flexDir='column'
            align='center'
            mx='auto'
            my={44}
            width={20}
        >
            <Flex 
                justify='space-around'
                width='100%'
            >
                <Box as='div' animation={`${loadingAnimation} 1s linear infinite`} style={{...dotStyles}}></Box>
                <Box as='div' animation={`${loadingAnimation} 1s 0.25s linear infinite`} style={{...dotStyles}}></Box>
                <Box as='div' animation={`${loadingAnimation} 1s 0.5s linear infinite`} style={{...dotStyles}} marginRight={0}></Box>
            </Flex>
            <Text 
                color='orange.500'
                fontSize='xl'
                fontWeight='bold'
                marginTop={4}
            >
                Loading
            </Text>
        </Flex>
    )
}

export default Loading;
