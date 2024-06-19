
import { useEffect, useState } from "react"
import { Flex, Heading, Spinner } from "@chakra-ui/react"
import TopicCard from "./TopicCard"
import { fetchAllTopics } from "../utils/api"

const AllTopics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            setTopics(topics)
            setIsLoading(false)
        })
    }, [])

    return (
        <Flex mt={10} as="main" justify="center" align="center" direction="column" >
            <Heading>All topics</Heading>
            {isLoading ? <Spinner/> :
                topics.map((topic) => (
                    <TopicCard topic={topic.slug} description={topic.description} />
                ))
            }
        </Flex>
    )
}

export default AllTopics;