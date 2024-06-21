import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FormControl, FormHelperText, FormLabel, Select, Flex, Button } from "@chakra-ui/react";
import { getAllUsers } from "../../utils/api";

const LoginForm = ({ setSuccessMessage, setLoginIsVisible }) => {
    const { setLoggedInUser } = useContext(UserContext);
    const [userList, setUserList] = useState([])
    const [selectedUsername, setSelectedUsername] = useState('');

    const handleUsernameChange = (event) => {
        setSelectedUsername(event.target.value);
    };

    const handleSubmit = () => {
        setLoggedInUser(selectedUsername);
        setLoginIsVisible(false);
        setSuccessMessage(true);
    }

    useEffect(() => {
        getAllUsers().then((data) => {
            const { users } = data
            setUserList(users)
        })
    }, [])

    return (
        <Flex as="form" onSubmit={handleSubmit} justify="center"  mt={4} w="280" direction="column" >
            <FormControl>
                <FormLabel pl={1} m={0}>Username</FormLabel>
                <Select onChange={handleUsernameChange} size="sm" borderRadius="5px" >
                    <option>Select username</option>
                    {userList &&
                        userList.map((user) => (
                            <option key={user.username} >{user.username}</option>
                        ))
                    }
                </Select>
                <FormHelperText>Choose your username from the list</FormHelperText>
            </FormControl>
            <Button mt={2} size="sm" type="submit" colorScheme="teal">Log in</Button>
        </Flex>
    )
}

export default LoginForm;