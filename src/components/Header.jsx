import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { useColorMode, IconButton, Box, Heading, Flex, Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { LuNewspaper } from "react-icons/lu";
import { fetchAllTopics } from "../utils/api";
import UserMenu from './UserMenu';
import TopicMenu from './TopicMenu';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            const sortedTopics = topics.sort((a, b) => a.slug.localeCompare(b.slug));
            setTopics(sortedTopics);
        })
    }, [])

    return (
        <Flex as="header" direction="column" borderBottom="1px" borderColor="teal.600" >
            <Flex m={2} justify="space-between" align="center" >
                <Icon as={LuNewspaper} boxSize={10} />
                <Heading as="h1" textAlign="center" flex="1">NewsHub</Heading>
                <UserMenu/>
                <IconButton
                        ml={2}
                        onClick={toggleColorMode}
                        aria-label="Toggle light/dark mode"
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
            </Flex>
            <Flex wrap="wrap" as="nav" justify="center" mb={4} align="center" >
                <ChakraLink as={ReactRouterLink} to="/home" >
                    <Text>Home</Text>
                </ChakraLink>
                <Text mx={4} >|</Text>
                <ChakraLink as={ReactRouterLink} to="/stories" >
                    <Text>Stories</Text>
                </ChakraLink>
                <Text mx={4} >|</Text>
                <TopicMenu />
                
            </Flex>
        </Flex>
    )
}

export default Header;