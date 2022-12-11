import { Box, Container, Grid, GridItem, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryHeader from '../layout/CategoryHeader';

import Loading from '../layout/Loading';

import { topCategoriesItems } from '../../utils/TopCategories';
import { fetchProducts } from '../../features/products/productSlice';
import ProductCard from './ProductCard';

const Products = () => {

    const dispatch = useDispatch();

    const { data, ui } = useSelector(state => state);
    const { loading } = ui;
    const { products, productsByCategory } = data;

    useEffect(() => {
        if(!products || products.length === 0)
            dispatch(fetchProducts());
    }, [dispatch]);

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
                                                    _hover={{
                                                        transform: 'scale(1.05)',
                                                        transition: 'transform 100ms ease-in-out',
                                                    }}
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

                            {
                                topCategoriesItems.map(category => (
                                    <Box key={category.id + 'p'}>
                                        <CategoryHeader displayText={category.name} />

                                        <Grid
                                            gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                                            gridRow='auto'
                                            gap={['1rem', '1rem', '2rem']}
                                            p={0}
                                        >
                                            {
                                                productsByCategory[category.name.toUpperCase()] 
                                                    && productsByCategory[category.name.toUpperCase()].slice(0, 3).map(product =>
                                                <GridItem key={product._id}>
                                                    <ProductCard product={product} />
                                                </GridItem>
                                            )}
                                        </Grid>        
                                    </Box>
                                ))
                            }
                        </Container>
                )
        }
        </>
    )
}

export default Products;
