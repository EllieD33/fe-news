import { Select } from "@chakra-ui/react";
import { capitaliseFirstLetter } from "../../utils/helpers";

const TopicSelector = ({ topics, onChange, required = false }) => {
    return (
        <Select borderRadius="5px" size="sm" onChange={onChange} required={required} >
                    <option>Select topic</option>
                    {topics && 
                        topics.map((topic) => (
                            <option key={topic.slug} value={topic.slug} >{capitaliseFirstLetter(topic.slug)}</option>
                        ))
                    }
        </Select>
    )
}

export default TopicSelector;