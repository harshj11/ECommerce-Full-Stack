import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    Link,
    Text
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import { MdClose } from 'react-icons/md';

import { links } from '../../utils/Links';

import CartLink from './cart/CartLink';

const Sidebar = ({ display, setDisplayFunc }) => {

    return (
        display === 'inline-block' ? (
            <Container
                display={display}
                h='100vh'
                w='100vw'
                position='absolute'
                top={0}
                left={0}
            >
                <Box
                    background='blackAlpha.300'
                    h='100vh'
                    w='100vw'
                    position='absolute'
                    top={0}
                    left={0}
                    zIndex={1}
                />
                <Flex
                    background='white'
                    h='100vh'
                    w={[44, 60]}
                    flexDir='column'
                    align='flex-start'
                    position='absolute'
                    left={0}
                    zIndex={2}
                >

                    <Flex
                        justify='space-between'
                        align='center'
                        pt='4'
                        px='4'
                        w='100%'
                    >
                        <Link
                            as={RouterLink}
                            _hover={{ borderBottom: 'none' }}
                            onClick={() => setDisplayFunc('none')}
                            to='/'
                        >
                            <Heading
                                size={['lg', 'md', 'lg']}
                            >
                                We<Text display='inline-block' color='orange.500'>Kart</Text>
                            </Heading>
                        </Link>

                        <IconButton
                            background='none'
                            boxShadow='none'
                            _hover={{ background: 'none' }}
                            icon={<MdClose />}
                            size='lg'
                            onClick={() => setDisplayFunc('none')}
                        />
                    </Flex>

                    <Flex
                        flexDir='column'
                        px={4}
                        w='100%'
                    >
                        {
                            links.map((link, index) =>
                                <Link
                                    as={RouterLink}
                                    borderBottom='solid 4px transparent'
                                    display='flex'
                                    alignItems='center'
                                    key={index}
                                    onClick={() => setDisplayFunc('none')}
                                    py={4}
                                    to={`/${link.path}`}
                                >
                                    {link.icon}{link.text}
                                </Link>
                            )
                        }
                    </Flex>

                    <Flex
                        px={['4', '0', '0']}
                    >
                        
                    </Flex>

                    <Flex
                        direction='column'
                        justify='space-around'
                        mt='2'
                        px={['4', '0', '0']}
                        w={['auto', '100%', '100%']}
                    >
                        <CartLink display={['inline-block', 'none']} onClick={() => setDisplayFunc('none')} />
                        <Link
                            as={RouterLink}
                            onClick={() => setDisplayFunc('none')}
                            to='/signup'
                            _hover={{
                                borderBottom: 'none'
                            }}
                        >
                            <Button
                                colorScheme='orange'
                                mt={['4', '0', '0']}
                                mx={[0, '4']}
                                size={['sm', 'md', 'lg']}
                            >
                                Signup
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Container>
        ) : null        
    )
}

export default Sidebar
