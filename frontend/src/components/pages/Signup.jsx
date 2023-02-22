import { useEffect, useState } from 'react';
import { Button, Flex, Heading, Image, Input, Text } from '@chakra-ui/react';
import { AiTwotoneMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoTextOutline } from 'react-icons/io5';
import FormInput from '../layout/FormInput';
import ErrorPage from '../layout/ErrorPage';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../layout/Loading';
import { registerUser } from '../../features/user/userSlice';
import { clearErrors } from '../../features/ui/uiSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, ui } = useSelector(state => state);
    
    const { loading, errors } = ui;
    const { isAuthenticated } = user;

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',        
        avatar: '',
        avatarPreview: '/profile.png',
        avatarFileName: 'profImg',
    });

    const [clientErrors, setClientErrors] = useState('');

    useEffect(() => {
        dispatch(clearErrors());
        if(isAuthenticated)
            navigate('/account');
        setClientErrors('');
    }, [dispatch, isAuthenticated, navigate]);

    const resetAvatar = () => {
        setUserData(prevVal => ({
            ...prevVal,
            avatar: '',
            avatarPreview: '/profile.png',
            avatarFileName: 'profImg',
        }));
    }

    const handleChange = (e) => {
        const inputControlName = e.target.name;
        if(inputControlName === 'avatar') {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                if(reader.readyState === 2) {
                    setUserData(prevVal => ({
                        ...prevVal,
                        avatar: reader.result,
                        avatarPreview: reader.result,
                        avatarFileName: e.target.files[0].name
                    }));
                }
            }
        }
        setUserData(prevVal => ({
            ...prevVal,
            [inputControlName]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(userData.name.length < 4) {
            setClientErrors({ message: "Name should have at least 4 characters!" });
            return;
        } else if(userData.password.length < 8) {
            setClientErrors({ message: "Password should have at least 8 characters!" });
            return;
        } else if(userData.password !== userData.confirmPassword) {
            setClientErrors({ message: "Password and Confirm Password do not match!" })
            return;
        }

        dispatch(registerUser(userData.name, userData.email, userData.password, userData.avatar));
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
                        h={['30rem', '31rem']}
                        w={['20rem', '24rem']}
                        mt='2rem'
                        p={8}
                    >
                        <Heading
                            mb={[0, 4]}
                            size={['lg', 'xl']}
                            textAlign='center'
                        >
                            <Text display='inline-block' fontSize={['2xl', '3xl']}>Signup for We</Text>
                            <Text display='inline-block' color='orange.500' fontSize={['2xl', '3xl']}>Kart</Text>
                        </Heading>
                        { (errors || clientErrors) ? 
                            <Text
                                backgroundColor='#FFCDD2'
                                color='red'
                                fontSize='sm'
                                mx='auto'
                                px='1'
                                width='fit-content'
                            >
                                { (errors && errors.data.message) || (clientErrors && clientErrors.message) }
                            </Text> 
                            : null 
                        }
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >

                            <FormInput
                                handleChange={handleChange}
                                icon={IoTextOutline}
                                name='name'
                                placeholder='Name'
                                type='text'
                                value={userData.name}
                            />

                            <FormInput
                                handleChange={handleChange}
                                icon={AiTwotoneMail}
                                name='email'
                                placeholder='Email'
                                type='email'
                                value={userData.email}
                            />

                            <FormInput
                                handleChange={handleChange}
                                icon={RiLockPasswordFill}
                                name='password'
                                placeholder='Password'
                                type='password'
                                value={userData.password}
                            />

                            <FormInput
                                handleChange={handleChange}
                                icon={RiLockPasswordFill}
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                type='password'
                                value={userData.confirmPassword}
                            />

                            <Text textDecoration='underline'>Avatar</Text>
                            <Flex
                                align='center'
                                position='relative'
                            >
                                <Image
                                    borderRadius='50%'
                                    h={8}
                                    w={8}
                                    src={userData.avatarPreview}
                                />

                                <Input
                                    accept='image/**'
                                    my={2}
                                    name='avatar'
                                    onChange={handleChange}
                                    type="file"
                                    variant="flushed"
                                />

                                {userData.avatarFileName !== 'profImg' ?
                                    <Button
                                        backgroundColor='#fff'
                                        boxShadow='none'
                                        onClick={resetAvatar}
                                        position='absolute'
                                        right='0'
                                        top={1}
                                    >
                                        X
                                </Button>
                                    : null
                                }
                            </Flex>

                            <Flex
                                direction='column'
                            >
                                <Button type='submit' colorScheme='orange'>Register</Button>
                            </Flex>

                        </form>

                    </Flex>
                </Flex>
            )
        )
    )
}

export default Signup;
