import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchAllTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";

const TopicFilter = () => {
    const [topics, setTopics] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            setTopics(topics);
        })
    }, [])

    const handleTopicChange = (event) => {
        const selectedTopic = event.target.value;
        if (selectedTopic !== "Select topic") {
            navigate(`/topics/${selectedTopic}`);
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