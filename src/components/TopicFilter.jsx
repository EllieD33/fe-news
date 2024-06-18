import { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Select, Flex } from "@chakra-ui/react";
import { fetchAllTopics } from "../utils/api";

const TopicFilter = ({ onTopicChange }) => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            setTopics(topics);
        })
    }, [])

    const handleTopicChange = (event) => {
        const newTopic = event.target.value;
        if (newTopic !== "Select topic") {
            setSelectedTopic(newTopic);
            onTopicChange(newTopic);
        }
    }

    const handleClear = () => {
        setSelectedTopic("");
        onTopicChange("");
    }

    return (
        <Flex as="form" align="flex-end" >
            <FormControl>
                <FormLabel m={0} >
                    Filter by category:
                </FormLabel>
                <Select borderRadius="5px" size="sm" onChange={handleTopicChange}>
                    <option>Select topic</option>
                    {topics && 
                        topics.map((topic) => (
                            <option key={topic.slug} value={topic.slug} >{topic.slug}</option>
                        ))
                    }
                </Select>
            </FormControl>
            <Button onClick={handleClear} size="sm" ml={2} colorScheme="teal" variant="outline">Clear</Button>
        </Flex>
    )
}

export default TopicFilter;