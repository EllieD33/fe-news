import { Flex, FormControl, FormLabel, Heading, Input, Textarea, Text } from "@chakra-ui/react"
import TopicSelector from "../components/forms/TopicSelector"

const PostStory = () => {
    return (
        <Flex as="main" mt={4} direction="column" align="center">
            <Heading>Post a story</Heading>
            <Text>Use this form to post a story. Keep it clean!</Text>
            <Flex as="form" w={[300, 400]} minW="300px">
                <FormControl display="flex" flexDirection="column" justifyContent="center" >
                    <FormLabel fontSize="sm" mt={4} mb={0} pl={1}  >Select topic:</FormLabel>
                    <TopicSelector />
                    <FormLabel fontSize="sm" mt={4} mb={0} pl={1} >Title:</FormLabel>
                    <Input size="sm" borderRadius="5px" />
                    <FormLabel fontSize="sm" mt={4} mb={0} pl={1}  >Main content:</FormLabel>
                    <Textarea size="xl" />
                    <FormLabel fontSize="sm" mt={4} mb={0} pl={1}  >Image URL:</FormLabel>
                    <Input size="sm" borderRadius="5px"/>
                </FormControl>
            </Flex>
        </Flex>
    )
}

export default PostStory;