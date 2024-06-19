import { Heading, Text, Flex, Box, Image, Link as ChakraLink } from "@chakra-ui/react"
import { Link as ReactRouterLink } from 'react-router-dom'


const PageNotFound = () => {
    return (
        <Flex as="main" justify="center" align="center" direction="column" h="90vh" >
            <Heading mb={4} >Nothing to see here!</Heading>
            <Box w="60%" pb="56.25%"  pos="relative" overflow="hidden" borderRadius="md"  boxShadow="md" >
                <Image src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGs2NzYxazBybzBnM3psZmlsY2p1NHZoZHNqdmc1YTN6OW0yMXdvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0RAvDxfdksWy39YG4T/giphy.webp" alt="Page not found" objectFit="cover" width="100%" height="100%" style={{ position: 'absolute' }}/>
            </Box>
            <ChakraLink as={ReactRouterLink} to="/home" mt={4} >Back to Home</ChakraLink>
        </Flex>
    )
}

export default PageNotFound;