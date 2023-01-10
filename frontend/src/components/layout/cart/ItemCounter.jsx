import React from 'react';

import { Button, Flex, Image } from '@chakra-ui/react';

import iconPlus from '../../../images/icon-plus.svg';
import iconMinus from '../../../images/icon-minus.svg';

const ItemCounter = ( { width, noOfItems, setNoOfItems } ) => {
    
    const changeNoOfItems = (operator) => {
        if(operator === '+')
            setNoOfItems(prev => prev + 1);
        else if(operator === '-') {
            if(noOfItems === 0)
                return;
            setNoOfItems(prev => prev - 1);
        }
    }

    return (
        <Flex
            bgColor='#f7f8fd'
            borderRadius={6}
            align='center'
            justify='space-between'
            height='3rem'
            width={width}
        >
            <Button
                borderRadius='none'
                bg='none'
                boxShadow='none'
                height='100%'
                _hover={{ bg: 'none' }}
                onClick={() => changeNoOfItems('-')}
            >
                <Image
                    src={iconMinus}
                />
            </Button>
            <Flex
                as='span'
                fontWeight='bold'
                height='100%'
                justify='center'
                align='center'
            >
                {noOfItems}
            </Flex>
            <Button
                bg='none'
                borderRadius='none'
                boxShadow='none'
                height='100%'
                _hover={{ bg: 'none' }}
                onClick={() => changeNoOfItems('+')}
            >
                <Image
                    src={iconPlus}
                />
            </Button>
        </Flex>
    )
}

export default ItemCounter;
