import { useState } from 'react';

import {
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Link,
    Text,
    IconButton,
    Input
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import { FiMenu, FiSearch } from 'react-icons/fi';

import Sidebar from './Sidebar';
import CartLink from './cart/CartLink';

const Header = () => {

    const [display, setDisplay] = useState('none');

    return (
        <Container
            background='white'
            maxW='100%'
            p={0}
            pos='fixed'
            top={0}
            zIndex={10}
        >
            <Flex
                boxShadow='lg'
                align='center'
                justify='space-between'
                px={[4, 4, 8, 12, 16]}
                py={4}
            >

                <Flex align='center' justify='flex-start' >
                    <IconButton
                        background='none'
                        boxShadow='none'
                        display='flex'
                        _hover={{ background: 'none' }}
                        icon={<FiMenu />}
                        onClick={() => { setDisplay('inline-block') }}
                        p={0}
                    />

                    <Link
                        as={RouterLink}
                        to='/'
                        _hover={{
                            borderBottom: 'none'
                        }}
                    >
                        <Heading
                            size={['lg', 'md', 'lg']}
                        >
                            We<Text display='inline-block' color='orange.500'>Kart</Text>
                        </Heading>
                    </Link>
                </Flex>

                <Flex
                    position='relative'
                    mr='3rem'
                >
                    <Input
                        borderRadius='0'
                        p='2'
                        w={['5.5rem', '9rem', '20rem']}
                        _focus={{
                            border: 'none',
                            outline: 'none'
                        }}
                    />
                    <IconButton
                        borderTopStartRadius='0'
                        borderBottomStartRadius='0'
                        colorScheme='orange'
                        icon={<FiSearch />}
                        position='absolute'
                        left='100%'
                    />
                </Flex>

                <Flex
                    align='center'
                >
                    <CartLink display={['none', 'inline-block']} />
                    <Button colorScheme='orange' size={['sm', 'md', 'lg']}>Login</Button>
                </Flex>

                <Sidebar display={display} setDisplayFunc={setDisplay} />

            </Flex>
        </Container>
    )
}

export default Header;