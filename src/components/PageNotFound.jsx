import { Heading, Text, Flex, Box, Image, Link as ChakraLink } from "@chakra-ui/react"
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'


const PageNotFound = () => {
    const location = useLocation();
    const pathname = location.pathname;

    let conditionalAddTopic = null;
    if (pathname.startsWith("/topics/")) {
        conditionalAddTopic = (
            <Text mt={4}>
                This topic doesn't exist - do you want to add it?
            </Text>
        );
    }

    return (
        <Flex mt={10} as="main" justify="center" align="center" direction="column" h="80%" >
            <Heading mb={4} >Nothing to see here!</Heading>
                <Image src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGs2NzYxazBybzBnM3psZmlsY2p1NHZoZHNqdmc1YTN6OW0yMXdvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0RAvDxfdksWy39YG4T/giphy.webp" alt="Page not found" objectFit="cover" width="100%" height="100%" maxW="350px" maxH="350px" borderRadius="5px" />
            
            {conditionalAddTopic}
            <ChakraLink as={ReactRouterLink} to="/home" mt={4} >Back to Home</ChakraLink>
        </Flex>
    )
}

export default PageNotFound;