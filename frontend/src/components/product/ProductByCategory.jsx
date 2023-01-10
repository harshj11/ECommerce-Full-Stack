import React, { useEffect, useState } from 'react';

import { Box, Container, Grid, GridItem } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import ProductCard from '../product/ProductCard';

import CategoryHeader from '../layout/CategoryHeader';
import Loading from '../layout/Loading';
import ErrorPage from '../layout/ErrorPage';

import { fetchProductsByCategory } from '../../features/products/productSlice';

import Pagination from '../layout/pagination/Pagination';

const ProductByCategory = () => {

    let { category } = useParams();
    category = category.toUpperCase();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsByCategory(category));
    }, [dispatch, category]);

    const { data, ui } = useSelector(state => state);
    const { productsByCategory } = data;
    const { errors, loading } = ui;

    const products = productsByCategory && productsByCategory[category];
    const numberOfProducts = productsByCategory && productsByCategory[category + ' COUNT'];
    const [currentPage, setCurrentPage] = useState(0);

    const handleChange = (data) => {
        dispatch(fetchProductsByCategory(category, data.selected + 1));
        setCurrentPage(data.selected);
    }

    return (
        loading ? <Loading /> 
            : (
                errors ? 
                    <ErrorPage 
                        errorCode={errors.statusCode} 
                        errorText={(errors.statusCode === 500) ? errors.statusText + ', Please refresh or try again later' : errors.data.message}
                    /> :
                    <Container
                        maxW='100vw'
                        mt={24}
                        px={[4, 4, 8, 12, 16]}
                        py={[0, 2]}
                    >
                        <CategoryHeader displayText={category} />

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
                        <Box
                            fontSize={['sm']}
                            my={4}
                            mx='auto'
                            width={['100%', '28rem', '30rem']}
                        >
                            <Pagination
                                currentPage={currentPage}
                                numberOfProducts={numberOfProducts}
                                handleChange={handleChange}
                            /> 
                        </Box>
                    </Container>
                )
    )
}

export default ProductByCategory;