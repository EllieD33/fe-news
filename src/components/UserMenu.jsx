import { useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import { Menu, MenuButton, IconButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";


const UserMenu = () => {
    const { loggedInUser } = useContext(UserContext);
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
                    <MenuItem icon={<MdLogin />}>
                        Log in
                    </MenuItem>
                ) : (
                    <>
                        <MenuItem icon={<FaRegUser />}>
                            Profile
                        </MenuItem>
                        <MenuItem icon={<MdLogout />}>
                            Log out
                        </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu>
    )
}

export default UserMenu;