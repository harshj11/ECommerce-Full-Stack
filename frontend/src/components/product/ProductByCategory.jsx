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

import Filter from '../layout/Filter';

const ProductByCategory = () => {

    let { category } = useParams();
    category = category.toUpperCase();

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("called");
        dispatch(fetchProductsByCategory(category));
    }, [dispatch, category]);

    const { data, ui } = useSelector(state => state);
    const { productsByCategory } = data;
    const { errors, loading } = ui;

    const products = productsByCategory && productsByCategory[category];
    const numberOfProducts = productsByCategory && productsByCategory[category + ' COUNT'];
    const filteredProductsCount = productsByCategory && productsByCategory[category + 'FILTERED COUNT'];
    
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8;

    const [filterValues, setFilterValues] = useState({
        priceRange: null,
        rating: null,
    });

    const handleChange = (data) => {
        dispatch(fetchProductsByCategory(category, data.selected + 1, filterValues.priceRange, filterValues.rating));
        setCurrentPage(data.selected);
    }

    const handleFilter = (priceRange, ratingValue) => {
        setFilterValues(prev => ({
            priceRange: priceRange,
            rating: ratingValue,
        }));
        dispatch(fetchProductsByCategory(category, 1, priceRange, ratingValue));
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
                        <Box
                            mx={[4, 4, 8, 12, 16]}
                            position='fixed'
                            top='10.5rem'
                            right='0'
                            zIndex={100}
                        >
                            <Filter handleFilter={handleFilter} />
                        </Box>
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
                        {
                            ((filterValues.priceRange || filterValues.rating) ? filteredProductsCount  : numberOfProducts) > productsPerPage ? 
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
                            : null
                        }
                    </Container>
                )
    )
}

export default ProductByCategory;