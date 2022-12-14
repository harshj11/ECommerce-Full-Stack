import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode, errorText, linkText }) => {
    return (
        <>
            <Flex
                direction='column'
                position='absolute'
                top='16rem'
                left='50%'
                transform='translateX(-50%)'
            >
                <Heading
                    size={['lg', 'md', 'lg']}
                >
                    We<Text display='inline-block' color='orange.500'>Kart</Text>
                </Heading>
                <Text fontSize='2xl' fontWeight='bold'>{errorCode}! :(</Text>
                <Text>
                    {errorText}!
                </Text>
                {
                    linkText && 
                    <Text color='orange.500'>
                        <Link to='/products'>{linkText}</Link>
                    </Text>
                }
            </Flex>
        </>
    )
}

export default ErrorPage;
