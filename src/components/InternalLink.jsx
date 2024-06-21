import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const InternalLink = ({ text, ariaLabel, to }) => {
    return (
        <ChakraLink
                as={ReactRouterLink}
                to={to}
                aria-label={ariaLabel}
                mb={2}
            >
                <Button
                    w="150px"
                    tabIndex={-1}
                    size="sm"
                    bg="teal.700"
                    _hover={{ bg: 'teal.500' }}
                    colorScheme="teal"
                >
                    {text}
                </Button>
            </ChakraLink>
    )
}

export default InternalLink;