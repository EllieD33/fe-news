import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Button, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { fetchAllTopics } from "../utils/api";
import { capitaliseFirstLetter } from "../utils/helpers";

const TopicMenu = () => {
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            const sortedTopics = topics.sort((a, b) => a.slug.localeCompare(b.slug));
            setTopics(sortedTopics);
        })
    }, [])

    return (
        <Menu>
            <MenuButton as={Button}  variant="unstyled" fontWeight="normal"  _hover={{textDecoration: 'underline', }} rightIcon={<ChevronDownIcon />}>Topics</MenuButton>
            <MenuList>
                <MenuItem onClick={() => navigate("/topics")} >All</MenuItem>
            {
                    topics.map((topic) => (
                        <MenuItem key={topic.slug} onClick={() => navigate(`/topics/${topic.slug}`)} >{capitaliseFirstLetter(topic.slug)}</MenuItem>
                    ))
                }
                
            </MenuList>
        </Menu>
    )
}

export default TopicMenu;