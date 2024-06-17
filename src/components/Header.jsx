import { useColorMode, IconButton, Heading, Flex } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <header>
            <Flex justify="space-between">
                <Heading as="h1">NewsHub</Heading>
                <IconButton
                        ml={2}
                        onClick={toggleColorMode}
                        aria-label="Toggle light/dark mode"
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
            </Flex>
        </header>
    )
}

export default Header;