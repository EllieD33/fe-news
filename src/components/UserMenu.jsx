import { useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, IconButton, MenuList, MenuItem, useToast } from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";


const UserMenu = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const navigate = useNavigate(); 
    const toast = useToast();

    const handleLogout = () => {
        setLoggedInUser(null)
        toast({
            title: "Logged out",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    }

    const handleLoginClick = () => {
        navigate("/login")
    }

    return (
        <Menu>
            <MenuButton 
                as={IconButton}
                isRound={true} 
                aria-label='Options'
                icon={<FaRegCircleUser size="30px" />}
            />
            <MenuList>
                {!loggedInUser ? (
                    <MenuItem icon={<MdLogin />} onClick={handleLoginClick} >
                        Log in
                    </MenuItem>
                ) : (
                    <>
                        <MenuItem icon={<FaRegUser />}>
                            Profile
                        </MenuItem>
                        <MenuItem icon={<MdLogout />} onClick={handleLogout} >
                            Log out
                        </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu>
    )
}

export default UserMenu;