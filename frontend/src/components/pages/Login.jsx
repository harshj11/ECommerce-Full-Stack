import { useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Heading,
    Text
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';
import { AiTwotoneMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import FormInput from '../layout/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';
import { clearErrors } from '../../features/ui/uiSlice';
import ErrorPage from '../layout/ErrorPage';
import Loading from '../layout/Loading';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, ui } = useSelector(state => state);

    const { loading, errors } = ui;
    const { isAuthenticated } = user;

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        dispatch(clearErrors());
        if(isAuthenticated)
            navigate('/account');
    }, [dispatch, isAuthenticated, navigate]);

    const handleChange = (e) => {
        const inputControl = e.target.name;
        setUserCredentials(prevVal => ({
            ...prevVal,
            [inputControl]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(userCredentials.email, userCredentials.password));
    }

    return (
        loading ? <Loading /> : (
            errors && errors.statusCode === 500 ?
            <ErrorPage 
                errorCode={errors.statusCode} 
                errorText={(errors.statusCode === 500) ? errors.statusText + ', Please refresh or try again later' : errors.data.message}
                /> : (
                    <Flex
                        backgroundImage='linear-gradient(-15deg, #FF7D1A 50%, #FFFFFF 50%)'
                        h='100vh'
                        align='center'
                        justify='center'
                    >
                        <Flex
                            backgroundColor='#FFFFFF'
                            borderRadius='6px'
                            boxShadow='5px 5px 10px rgba(0, 0, 0, 0.25),
                            -5px -5px 15px rgba(0, 0, 0, 0.25)'
                            direction='column'
                            h={['24rem']}
                            w={['20rem', '24rem']}
                            p={8}
                        >
                            <Heading
                                mb={[4, 8]}
                                size={['lg', 'xl']}
                                textAlign='center'
                            >
                                <Text display='inline-block'>Login to </Text>
                                {' '}We<Text display='inline-block' color='orange.500'>Kart</Text>
                            </Heading>
                            {errors ?
                                <Text
                                    backgroundColor='#FFCDD2'
                                    color='red'
                                    fontSize='sm'
                                    mx='auto'
                                    px='1'
                                    width='fit-content'
                                >
                                    {errors.data.message}
                                </Text>
                                : null
                            }
                            <form onSubmit={handleSubmit}>

                                <FormInput
                                    handleChange={handleChange}
                                    icon={AiTwotoneMail}
                                    name='email'
                                    placeholder='Email'
                                    type='email'
                                    value={userCredentials.email}
                                />

                                <FormInput
                                    handleChange={handleChange}
                                    icon={RiLockPasswordFill}
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    value={userCredentials.password}
                                />

                                <Flex
                                    direction='column'
                                >
                                    <Text
                                        color='#FF7D1A'
                                        fontWeight='bold'
                                        my={4}
                                    >
                                        <RouterLink
                                            to='/forgot-passwrod'
                                        >
                                            Forgot password?
                            </RouterLink>
                                    </Text>

                                    <Button type='submit' colorScheme='orange'>Login</Button>
                                </Flex>

                            </form>

                        </Flex>
                    </Flex>
                )
        )
    )
}

export default Login;
