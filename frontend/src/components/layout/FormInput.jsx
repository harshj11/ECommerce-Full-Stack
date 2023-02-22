import { FormControl, Flex, Input } from '@chakra-ui/react';

const FormInput = ({ handleChange, icon: Icon, name='', placeholder='', type='', value='' }) => {
    return (
        <FormControl my={4} isRequired>
            <Flex>
                <Flex
                    position='absolute'
                    align='center'
                    justify='center'
                    h={10}
                    w={10}
                >
                    <Icon />
                </Flex>
                <Input
                    borderColor='#AAAAAA'
                    focusBorderColor='#AAAAAA'
                    onChange={handleChange}
                    name={name}
                    type={type}
                    pl={8}
                    placeholder={placeholder}
                    value={value}
                    variant='flushed'
                />
            </Flex>
        </FormControl>
    )
}

export default FormInput;
