import React from 'react';
import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import iconCart from '../../../images/icon-cart.svg';

const CartLink = ({ display, onClick }) => {
    
    return (
        <Link
            to='/cart'
            onClick={onClick}
        >
            <Image
                src={iconCart}
                display={display}
                marginRight='1rem'
            />
        </Link>
    )
}

export default CartLink;
