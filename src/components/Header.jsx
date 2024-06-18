import { useColorMode, IconButton, Heading, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <header>
            <Flex justify="space-between">
                <Heading  as="h1">NewsHub</Heading>
                <IconButton
                        ml={2}
                        onClick={toggleColorMode}
                        aria-label="Toggle light/dark mode"
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
            </Flex>
            <Flex justify="center" mb={4} >
                <ChakraLink as={ReactRouterLink} to="/home" >
                    <Text>Home</Text>
                </ChakraLink>
                <Text mx={4} >|</Text>
                <ChakraLink as={ReactRouterLink} to="/stories">
                    <Text>All stories</Text>
                </ChakraLink>
            </Flex>
        </header>
    )
}

export default Header;