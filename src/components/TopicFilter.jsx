import { useState, useEffect } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
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

    return (
        <form>
            <FormControl>
                <FormLabel m={0} >
                    Filter by category:
                </FormLabel>
                <Select onChange={handleTopicChange}>
                    <option>Select topic</option>
                    {topics && 
                        topics.map((topic) => (
                            <option key={topic.slug} value={topic.slug} >{topic.slug}</option>
                        ))
                    }
                </Select>
            </FormControl>
        </form>
    )
}

export default TopicFilter;