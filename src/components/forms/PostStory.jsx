import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Flex, FormControl, FormLabel, Heading, Input, Textarea, Text, Button, IconButton } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons";
import { postStory } from "../../utils/api";
import { fetchAllTopics } from "../../utils/api";
import TopicSelector from "./TopicSelector"

const PostStory = () => {
    const { loggedInUser } = useContext(UserContext);
    const [isPosting, setIsPosting] = useState(false);
    const [errors, setErrors] = useState({});
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState();
    const [titleInput, setTitleInput] = useState('');
    const [mainContentInput, setMainContentInput] = useState('');
    const [imageUrlInput, setImageUrlInput] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchAllTopics().then(({ topics }) => {
            const sortedTopics = topics.sort((a, b) => a.slug.localeCompare(b.slug));
            setTopics(sortedTopics);
        })
    }, [])

    const handleCloseClick = () => {
        navigate(-1)
    }

    const handleTopicSelection = (event) => {
        setSelectedTopic(event.target.value);
    }
    
    const handleTitleInputChange = (event) => {
        setTitleInput(event.target.value);
    }
    
    const handleMainContentInputChange = (event) => {
        setMainContentInput(event.target.value);
    }
    
    const handleImageUrlInputChange = (event) => {
        setImageUrlInput(event.target.value);
    }
    
    const validateForm = () => {
        let isValid = true;
        const errors = {};

        const validTextRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s.,!?;:()'"-]+$/
        const urlRegex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

        if (!selectedTopic) {
            errors.topicSelector = "Please choose a topic";
            isValid = false;
        }
        if (titleInput.length > 120 || !validTextRegex.test(titleInput)) {
            errors.titleInput = "Must contain letters and be no more than 120 characters";
            isValid = false;
        }
        if (mainContentInput.length > 10000 || !validTextRegex.test(mainContentInput)) {
            errors.mainContentInput = "Must contain letters and be no more than 10000 characters";
            isValid = false;
        }
        if (!urlRegex.test(imageUrlInput)) {
            errors.imageUrlInput = "Please enter a valid URL";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) return
        setIsPosting(true);

        const story = {
            author: loggedInUser.username,
            title: titleInput,
            body: mainContentInput,
            topic: selectedTopic,
            article_img_url: imageUrlInput || null
        }

        postStory(story.author, story.title, story.body, story.topic, story.article_img_url).then((addedStory) => {
            const { article } = addedStory
            setIsPosting(false);
            setErrors({});
            navigate(`/stories/${article.article_id}`);
        }).catch((error) => {
            console.error('Error posting story:', error);
            setIsPosting(false);
            setErrors({ failedToAdd: "Couldn't create story. Please try again." })
        })

    }
    return (
        <Flex as="main" mt={4} direction="column" align="center">
            <Flex w="80%" justifyContent="space-between">
                <Heading flex={1} textAlign="center">Post a story</Heading>
                <IconButton onClick={handleCloseClick} size="sm" aria-label="Close form" icon={<CloseIcon/>} />
            </Flex>
            <Text>Use this form to post a story. Keep it clean!</Text>
            <Flex onSubmit={handleSubmit} direction="column" as="form" w={[300, 400]} minW="300px">
                <FormControl display="flex" flexDirection="column" justifyContent="center" >
                    <FormLabel fontSize="sm" mt={4} mb={0} pl={1}  >Select topic:</FormLabel>
                    <TopicSelector onChange={handleTopicSelection} topics={topics} required={true} />
                    {errors.topicSelector && <Text fontSize="sm" color="red">{errors.topicSelector }</Text> }
                    <FormLabel fontSize="sm" mt={4} mb={0} pl={1} >Title:</FormLabel>
                    <Input id="titleInput" name="titleInput" value={titleInput} onChange={handleTitleInputChange} size="sm" borderRadius="5px" required />
                    {errors.titleInput && <Text fontSize="sm" color="red">{errors.titleInput}</Text>}
                    <FormLabel fontSize="sm" mt={4} mb={0} pl={1}  >Main content:</FormLabel>
                    <Textarea id="mainContentInput" name="mainContentInput" value={mainContentInput} onChange={handleMainContentInputChange} required borderRadius="5px" />
                    {errors.mainContentInput && <Text fontSize="sm" color="red">{errors.mainContentInput}</Text>}
                    <FormLabel fontSize="sm" mt={4} mb={0} pl={1}  >Image URL:</FormLabel>
                    
                        <Input id="imageUrl" name="imageUrl" value={imageUrlInput} onChange={handleImageUrlInputChange} size="sm" borderRadius="5px"/>
                    {errors.imageUrlInput && <Text fontSize="sm" color="red">{errors.imageUrlInput}</Text>}
                </FormControl>
                <Button type="submit" mt={4} size="sm" colorScheme="teal">{isPosting ? "Posting..." : "Post story"}</Button>
                {errors.failedToAdd && <Text color="red" textAlign="center" mt={1} >{errors.failedToAdd}</Text> }
            </Flex>
        </Flex>
    )
}

export default PostStory;