import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { useColorMode, IconButton, useColorModeValue, Heading, Flex, Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { LuNewspaper } from "react-icons/lu";
import { fetchAllTopics } from "../utils/api";
import UserMenu from './UserMenu';
import TopicMenu from './TopicMenu';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [topics, setTopics] = useState([]);
    const bg = useColorModeValue("white", "gray.800");

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            const sortedTopics = topics.sort((a, b) => a.slug.localeCompare(b.slug));
            setTopics(sortedTopics);
        })
    }, [])

    return (
        <Flex as="header" bg={bg} justify="space-between" px={5} align="center" borderBottom="1px" borderColor="teal.600" boxShadow="0px 6px 8px 0px rgba(40, 94, 97, 1)" position="sticky" top="0" zIndex="10">
                <Icon as={LuNewspaper} boxSize={10} />
            <Flex mx={2} mt={2} justify="space-between" align="center" direction="column" >
                <Heading as="h1" textAlign="center" flex="1">NewsHub</Heading>
                <Flex wrap="wrap" as="nav" justify="center"  align="center" >
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
                <Flex direction={{base: "column", sm: "row"}} align="center" justify="center">
                    <UserMenu my={1} />
                    <IconButton
                            my={1}
                            ml={1}
                            isRound
                            onClick={toggleColorMode}
                            aria-label="Toggle light/dark mode"
                            icon={colorMode === 'light' ? <MoonIcon boxSize={5} /> : <SunIcon boxSize={5} />}
                        />
                </Flex>
        </Flex>
    )
}

export default Header;