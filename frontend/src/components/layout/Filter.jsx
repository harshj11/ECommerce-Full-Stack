import { Button, Flex, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillFilter } from 'react-icons/ai/';

const Filter = ({ handleFilter }) => {

    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        priceValue: -1,
        ratingValue: 0,
    });

    const handleOpen = () => {
        setOpen(!open);
    }

    const getMinMaxPrices = (value) => {
        let prices;
        switch(value) {
            case '1': prices = [0, 500];
                break;
            case '2': prices = [500, 2500];
                break;
            case '3': prices = [2500, 5000];
                break;
            case '4': prices = [5000, 10000];
                break;
            case '5': prices = [10000, 100000];
                break;
        }

        return prices;
    }

    const handleValuesChange = (e, toChange) => {
        if(toChange === 'p') {
            setValues(prev => ({
                ...prev,
                priceValue: e,
            }))
        } else if(toChange === 'r') {
            setValues(prev => ({
                ...prev,
                ratingValue: e,
            }))
        }
    }

    return (
        <>
            <Flex
                align='center'
                justify='center'
                bgColor='#FFFFFF'
                boxShadow='5px 5px 10px rgba(0, 0, 0, 0.25),
                            -5px -5px 10px rgba(0, 0, 0, 0.25)'
                borderRadius='50%'
                cursor='pointer'
                h={12}
                w={12}
                onClick={handleOpen}
            >
                <AiFillFilter fill='#FF7D1A' />
            </Flex>
            {
                open ? (
                    <Flex
                        borderRadius={6}
                        bgColor='#FFFFFF'
                        boxShadow='5px 5px 15px rgba(0, 0, 0, 0.25)'
                        direction='column'
                        fontSize='1rem'
                        p={4}
                        position='absolute'
                        top='1rem'
                        right='3.5rem'
                        w={['16rem', '18rem']}
                    >
                        <Flex
                            align='center'
                            justify='space-between'
                        >
                            <Text
                                fontWeight='bold'
                                my={2}
                            >
                                Filter by Price
                            </Text>
                        </Flex>
                        <RadioGroup
                            onChange={(e) => { handleValuesChange(e, 'p')}}
                            value={values.priceValue}
                        >
                            <Stack direction='column'>
                                <Radio value='1' colorScheme='orange'> Less than 500</Radio>
                                <Radio value='2' colorScheme='orange'>500 - 2500</Radio>
                                <Radio value='3' colorScheme='orange'>2500 - 5000</Radio>
                                <Radio value='4' colorScheme='orange'>5000 - 10000</Radio>
                                <Radio value='5' colorScheme='orange'>More than 10000</Radio>
                            </Stack>
                        </RadioGroup>
                        <Text
                            fontWeight='bold'
                            my={2}
                        >
                            Filter by Ratings
                        </Text>
                        <RadioGroup
                            onChange={(e) => handleValuesChange(e, 'r')}
                            value={values.ratingValue}
                        >
                            <Stack direction='column'>
                                <Radio value='0' colorScheme='orange'>0 and Above</Radio>
                                <Radio value='1' colorScheme='orange'>1 and Above</Radio>
                                <Radio value='2' colorScheme='orange'>2 and Above</Radio>
                                <Radio value='3' colorScheme='orange'>3 and Above</Radio>
                                <Radio value='4' colorScheme='orange'>4 and Above</Radio>
                            </Stack>
                        </RadioGroup>
                        <Button
                            borderRadius={6}
                            colorScheme='orange'
                            size='sm'
                            onClick={() => handleFilter(getMinMaxPrices(values.priceValue), values.ratingValue)}
                            mt={2}
                        >
                            Filter
                        </Button>
                    </Flex>
                ) : null
            }
        </>
    )
}

export default Filter;