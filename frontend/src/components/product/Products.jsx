import { Box, Container, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryHeader from '../layout/CategoryHeader';

import Loading from '../layout/Loading';

import { topCategoriesItems } from '../../utils/TopCategories';

const Products = () => {

    const { ui } = useSelector(state => state);

    const { loading } = ui;

    return (
        <>
            {
                loading ? <Loading /> 
                    : ( 
                        <Container
                            maxW='100vw'
                            px={[4, 4, 8, 12, 16]}
                            py={[0, 2]}
                            mt={24}
                        >
                            <Box>
                                <CategoryHeader displayText='Top Categories' />

                                <Grid
                                    gridTemplateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}
                                    gridTemplateRows='auto'
                                    overflow='auto'
                                    gap={6}
                                    py={4}
                                >
                                    {
                                        topCategoriesItems.map(item =>
                                            <Link to={`/products/${item.linkTo}`} key={item.id}>
                                                <GridItem
                                                    backgroundColor='orange'
                                                    backgroundImage={item.bgImage}
                                                    backgroundPosition='left'
                                                    backgroundRepeat='no-repeat'
                                                    backgroundSize='cover'
                                                    borderRadius={6}
                                                    height={['4rem', '8rem']}
                                                    width={['100%']}
                                                    key={item._id}
                                                >
                                                    <Text
                                                        color='white'
                                                        fontWeight='bold'
                                                        paddingTop={2}
                                                        paddingLeft={2}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </GridItem>
                                            </Link>
                                        )
                                    }
                                </Grid>
                            </Box>

                        </Container>
                )
        }
        </>
    )
}

export default Products;
