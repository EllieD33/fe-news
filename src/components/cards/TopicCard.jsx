import { Link as ReactRouterLink } from "react-router-dom"
import { Flex, Heading, Text, Card, LinkBox, LinkOverlay, Icon } from "@chakra-ui/react"
import { capitaliseFirstLetter } from "../../utils/helpers"

const TopicCard = ({ topic, description }) => {
    return (
        <LinkBox>
            <Card my={4} w={[300, 400, 500]} as="section" transition="all 0.2s" _hover={{ transform: "translateY(-4px)", shadow: "lg" }}>
                <LinkOverlay as={ReactRouterLink} to={`/topics/${topic}`} >
                    <Flex p={4} direction="column" justify="center" align="center" >
                        <Heading as="h3" fontSize="2xl">{topic && capitaliseFirstLetter(topic)}</Heading>
                        <Text textAlign="center">{description && description}</Text>
                    </Flex>
                </LinkOverlay>
            </Card>
        </LinkBox>
    )
}

export default TopicCard