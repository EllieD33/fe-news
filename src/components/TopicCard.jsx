import { Flex, Heading, Text, Card } from "@chakra-ui/react"

const TopicCard = () => {
    return (
        <Card my={4} w="80%" as="section" transition="all 0.2s" _hover={{ transform: "translateY(-4px)", shadow: "lg" }}>
            <Flex p={4} direction="column" justify="center" align="center" >
                <Heading as="h3">Topic name</Heading>
                <Text>Number of stories</Text>
            </Flex>
        </Card>
    )
}

export default TopicCard