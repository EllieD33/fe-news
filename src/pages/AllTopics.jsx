import { useEffect, useState } from "react"
import { Flex, Heading, Spinner, Text, Button, Icon } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import TopicCard from "../components/cards/TopicCard"
import { fetchAllTopics } from "../utils/api"
import NewTopicForm from "../components/forms/NewTopicForm"

const AllTopics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const [newTopicFormIsVisible, setNewTopicFormIsVisible] = useState(false);
    const [showTopicFormButton, setShowTopicFormButton] = useState(true);

    const handleAddTopicClick = () => {
        setNewTopicFormIsVisible(true);
        setShowTopicFormButton(false);
    };

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            setTopics(topics)
            setIsLoading(false)
        })
    }, [])

    return (
        <Flex mt={10} as="main" justify="center" align="center" direction="column" >
            <Heading fontSize="3xl">All topics</Heading>
            <Text textAlign="center" p={2}>Can't find what you're looking for? You could add your own topic.</Text>
            {showTopicFormButton && (
                <Button
                w="150px"
                leftIcon={<Icon as={AddIcon} />}
                size="sm"
                colorScheme="teal"
                bg="teal.700"
                _hover={{ bg: 'teal.500' }}
                sx={{ svg: { color: "whiteAlpha.900" } }}
                onClick={handleAddTopicClick}
                >
                                Add topic
                            </Button>
                        )}
            {newTopicFormIsVisible && <NewTopicForm topics={topics} setTopics={setTopics} setNewTopicFormIsVisible={setNewTopicFormIsVisible} setShowTopicFormButton={setShowTopicFormButton} />}
            {isLoading ? <Spinner/> :
                topics.map((topic) => (
                    <TopicCard topic={topic.slug} key={topic.slug} description={topic.description} />
                ))
            }
        </Flex>
    )
}

export default AllTopics;