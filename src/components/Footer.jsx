import React, { useState, useEffect } from 'react';
import { Flex, Button, Icon } from "@chakra-ui/react"
import { FaArrowCircleUp } from "react-icons/fa";

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsVisible(scrollTop > window.innerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Flex as="footer" justify="center" mt={2} h="auto">
            {isVisible && (<Button mb={10} size="sm" colorScheme="teal" variant="outline" onClick={handleScrollToTop} leftIcon={<Icon as={FaArrowCircleUp} boxSize={4} />}>
                Back to top
            </Button>)}
        </Flex>
    )
}

export default Footer;