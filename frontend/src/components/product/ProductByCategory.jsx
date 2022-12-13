import { Container, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import CategoryHeader from '../layout/CategoryHeader';
import { useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../features/products/productSlice';

const ProductByCategory = () => {

    let { category } = useParams();
    category = category.toUpperCase();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsByCategory(category));
    }, [dispatch, category]);

    const { productsByCategory } = useSelector(state => state.data);
    const products = productsByCategory && productsByCategory[category];

    return (
        <Container
            maxW='100vw'
            mt={24}
            px={[4, 4, 8, 12, 16]}
            py={[0, 2]}
            
        >
            <CategoryHeader displayText={category}  />
            
            <Grid
                gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                gridRow='auto'
                gap={['1rem', '1rem', '2rem']}
                p={0}
            >
                {
                    products && products.map(product =>
                        <GridItem key={product._id}>
                            <ProductCard product={product} />
                        </GridItem>
                    )
                }
            </Grid>
        </Container>
    )
}

export default ProductByCategory;
