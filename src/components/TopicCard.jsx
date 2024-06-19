import { Flex, Heading, Text, Card } from "@chakra-ui/react"
import { capitaliseFirstLetter } from "../utils/helpers"

const TopicCard = ({ topic, description }) => {
    return (
        <Card my={4} w="80%" as="section" transition="all 0.2s" _hover={{ transform: "translateY(-4px)", shadow: "lg" }}>
            <Flex p={4} direction="column" justify="center" align="center" >
                <Heading as="h3">{topic && capitaliseFirstLetter(topic)}</Heading>
                <Text>{description && description}</Text>
            </Flex>
        </Card>
    )
}

export default TopicCard