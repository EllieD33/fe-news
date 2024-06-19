import { Flex } from "@chakra-ui/react"
import TopicCard from "./TopicCard"

const AllTopics = () => {
    return (
        <Flex h="80vh" as="main" justify="center" align="center" direction="column" >
            <TopicCard/>
            <TopicCard/>
            <TopicCard/>
        </Flex>
    )
}

export default AllTopics;