import { FormControl, FormLabel, Input, Flex, Button, Heading, Text } from "@chakra-ui/react"
import { useState } from "react"
import { addTopic } from "../../utils/api";

const NewTopicForm = ({ topics, setTopics, setNewTopicFormIsVisible, setShowTopicFormButton, setSuccessMessage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [newTopicSlug, setNewTopicSlug] = useState({});
    const [newTopicDesc, setNewTopicDesc] = useState({});
    
    const handleCloseClick = () => {
        setNewTopicFormIsVisible(false);
        setShowTopicFormButton(true);
    }

    const handleSlugInputChange = (event) => {
        setNewTopicSlug(event.target.value)
    }

    const handleDescInputChange = (event) => {
        setNewTopicDesc(event.target.value)
    }

    const validateForm = () => {
        let isValid = true
        const errors = {};

        if (!newTopicSlug || !newTopicDesc) {
            errors.blankInputError = "Topic name and description must both be provided";
            isValid = false;
        }
        const slugRegex = /^[a-z]{1,15}$/
        const descRegex = /^(?=(.*[a-zA-Z].*))(\b[\w'-]+\b[,.!?;:]?\s*){1,20}$/

        if (!slugRegex.test(newTopicSlug)) {
            errors.slugInput = "Topic must be one word, all lowercase.";
            isValid = false;
        }
        if (!descRegex.test(newTopicDesc)) {
            errors.descInput = "Description must include letters and cannot be longer than 20 words.";
            isValid = false;
        }

        setErrors(errors);

        return isValid
    }

    const handleTopicSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) return

        const tempTopic = { slug: newTopicSlug, description: newTopicDesc }
        setNewTopicSlug([tempTopic, ...topics]);
        setIsLoading(true);

        addTopic(newTopicSlug, newTopicDesc).then((addedTopic) => {
            const { topic } = addedTopic;
            setTopics((prevTopics) => [topic, ...prevTopics.filter(slug => slug.slug !== tempTopic.slug)]);
            setNewTopicSlug('');
            setNewTopicDesc('');
            setErrors({});
            setIsLoading(false)
            setNewTopicFormIsVisible(false)
            setShowTopicFormButton(true)
            setSuccessMessage(true)
        }).catch((error) => {
            console.error('Error creating topic:', error);
            setTopics(topics);
            setIsLoading(false);
            setErrors({ failedToAdd: "Couldn't create topic. Please try again later." })
        })
    }

    return (
        <Flex as="form" mt={2} borderY="1px" py={2} borderColor="teal.400" w={[300, 400]} onSubmit={handleTopicSubmit} direction="column">
            <Heading as="h3" fontSize="xl">Add a topic</Heading>
            <FormControl>
                <FormLabel fontSize="sm" m={0} pl={1}>
                    Topic (single lowercase word):
                </FormLabel>
                <Input name="slugInput" id="slugInput" onChange={handleSlugInputChange} placeholder="Enter topic..." size="sm" borderRadius="5px" required />
                {errors.slugInput && <Text fontSize="sm" color="red">{errors.slugInput}</Text>}
                <FormLabel fontSize="sm" m={0} pl={1}>
                    Topic description (1-20 words):
                </FormLabel>
                <Input name="descInput" id="descInput" onChange={handleDescInputChange} placeholder="Enter topic description..." size="sm" borderRadius="5px" required />
                {errors.descInput && <Text fontSize="sm" color="red">{errors.descInput}</Text>}
            </FormControl>
            <Flex justify="space-between">
                <Button mt={1} type="submit" colorScheme="teal" size="sm">{isLoading ? 'Adding...' : 'Add'}</Button>
                <Button mt={1} onClick={handleCloseClick} colorScheme="teal" size="sm" >Close</Button>
            </Flex>
        </Flex>
    )
}

export default NewTopicForm;