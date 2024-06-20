import { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Select, Flex } from "@chakra-ui/react";
import { fetchAllTopics } from "../../utils/api";
import { capitaliseFirstLetter } from '../../utils/helpers';
import TopicSelector from "./TopicSelector";

const TopicFilter = ({ onTopicChange }) => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            const sortedTopics = topics.sort((a, b) => a.slug.localeCompare(b.slug));
            setTopics(sortedTopics);
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
        <Flex mt={2} as="form" align="flex-end" >
            <FormControl>
                <FormLabel fontSize="sm" pl={1} m={0} >
                    Filter by topic:
                </FormLabel>
                <TopicSelector topics={topics} onChange={handleTopicChange} />
            </FormControl>
            <Button onClick={handleClear} size="sm" ml={2} colorScheme="teal" color="teal.800" variant="outline">Clear</Button>
        </Flex>
    )
}

export default TopicFilter;