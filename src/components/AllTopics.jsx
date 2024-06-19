
import { Flex, Heading } from "@chakra-ui/react"
import TopicCard from "./TopicCard"
import { fetchAllTopics } from "../utils/api"
import { useEffect, useState } from "react"

const AllTopics = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            setTopics(topics)
        })
    }, [])

    return (
        <Flex mt={10} as="main" justify="center" align="center" direction="column" >
            <Heading>All topics</Heading>
            {
                topics.map((topic) => (
                    <TopicCard topic={topic.slug} description={topic.description} />
                ))
            }
        </Flex>
    )
}

export default AllTopics;