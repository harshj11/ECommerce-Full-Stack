import React from 'react'

import { Container, Heading, VStack } from '@chakra-ui/react';

import FeaturedProducts from '../product/FeaturedProducts';

const Home = () => {

    return (
        <Container
            maxW='100vw'
            px={[4, 4, 8, 12, 16]}
            py={6}
        >
            <VStack mt={24}>
                <Heading
                    as='h2'
                    size='lg'
                >
                    Featured Products
                </Heading>
                <Container
                    maxW='100vw'
                    py={4}
                >
                    <FeaturedProducts />
                </Container>

            </VStack>
        </Container>
    )
}

export default Home;
