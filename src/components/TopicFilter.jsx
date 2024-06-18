import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react"
import { fetchAllTopics } from "../utils/api";

const TopicFilter = ({ setStories }) => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            console.log(topics)
            setTopics(topics);
        })
    }, [])

    const handleTopicChange = () => {
        //to do
    }

    return (
        <form>
            <FormControl>
                <FormLabel m={0} >
                    Filter by category:
                </FormLabel>
                <Select onChange={handleTopicChange}>
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