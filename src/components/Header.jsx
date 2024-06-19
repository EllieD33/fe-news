import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { useColorMode, IconButton, Heading, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { fetchAllTopics } from "../utils/api";
import { capitaliseFirstLetter } from '../utils/helpers';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            setTopics(topics);
        })
    }, [])

    return (
        <header>
            <Flex m={2} justify="space-between" >
                <Heading as="h1">NewsHub</Heading>
                <IconButton
                        ml={2}
                        onClick={toggleColorMode}
                        aria-label="Toggle light/dark mode"
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
            </Flex>
            <Flex wrap="wrap" as="nav" justify="center" mb={4} >
                <ChakraLink as={ReactRouterLink} to="/home" >
                    <Text>Home</Text>
                </ChakraLink>
                <Text mx={4} >|</Text>
                <ChakraLink as={ReactRouterLink} to="/stories">
                    <Text>All stories</Text>
                </ChakraLink>
                <Text mx={4} >|</Text>
                {
                    topics.map((topic, index) => (
                        <Flex key={topic.slug}>
                            <ChakraLink as={ReactRouterLink} to={`topics/${topic.slug}`} >
                                <Text>{capitaliseFirstLetter(topic.slug)}</Text>
                            </ChakraLink>
                            {index !== topics.length - 1 && <Text mx={4}>|</Text>}
                        </Flex>
                    ))
                }
            </Flex>
        </header>
    )
}

export default Header;