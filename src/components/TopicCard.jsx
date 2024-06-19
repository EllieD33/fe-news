import { Flex, Heading, Text, Card, LinkBox, LinkOverlay } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"
import { capitaliseFirstLetter } from "../utils/helpers"

const TopicCard = ({ topic, description }) => {
    return (
        <LinkBox>
            <Card my={4} w="80%" minW="420px" as="section" transition="all 0.2s" _hover={{ transform: "translateY(-4px)", shadow: "lg", color: "teal" }}>
                <LinkOverlay as={ReactRouterLink} to={`/topics/${topic}`} >
                    <Flex p={4} direction="column" justify="center" align="center" >
                        <Heading as="h3">{topic && capitaliseFirstLetter(topic)}</Heading>
                        <Text>{description && description}</Text>
                    </Flex>
                </LinkOverlay>
            </Card>
        </LinkBox>
    )
}

export default TopicCard