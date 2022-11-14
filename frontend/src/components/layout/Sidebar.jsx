import {
    Box,
    Container,
    Flex,
    IconButton,
    Link
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import { MdClose } from 'react-icons/md';

import { links } from '../../utils/Links';

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
                    w={40}
                    flexDir='column'
                    align='flex-start'
                    position='absolute'
                    left={0}
                    zIndex={2}
                >
                    <IconButton
                        alignSelf='flex-end'
                        background='none'
                        boxShadow='none'
                        _hover={{ background: 'none' }}
                        icon={<MdClose />}
                        size='lg'
                        onClick={() => setDisplayFunc('none')}
                    />

                    <Flex
                        flexDir='column'
                        pl={4}
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
                </Flex>
            </Container>
        ) : null        
    )
}

export default Sidebar
