import { useState, useContext, useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Button, Flex, Heading, Text, SkipNavContent, Link as ChakraLink } from "@chakra-ui/react";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [loginIsVisible, setLoginIsVisible] = useState(true);
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        if (loggedInUser) {
            setLoginIsVisible(false);
            setSuccessMessage(true);
        }
    }, [loggedInUser]);

    const handleLogoutClick = () => {
        setLoggedInUser(null);
        setLoginIsVisible(true);
        setSuccessMessage(false);
    }

    return (
        <>
            <SkipNavContent />
            <Flex as="main" mt={4} direction="column" justify="center" align="center">
                <Heading fontSize="2xl" textAlign="center" >Login</Heading>
                {loginIsVisible && <LoginForm setLoginIsVisible={setLoginIsVisible} setSuccessMessage={setSuccessMessage} />}
                {successMessage && 
                    <>
                        <Text mt={4} >You are logged in as {loggedInUser}. <ChakraLink as={ReactRouterLink} color="teal.600" fontWeight="bold" to="/profile" >Go to profile</ChakraLink>. </Text>
                        <Text mt={2}>Not you?</Text>
                        <Button size="sm" colorScheme="teal" mt={2} onClick={handleLogoutClick} >Logout</Button>
                    </>
                }
            </Flex>
        </>
    )
}

export default Login;