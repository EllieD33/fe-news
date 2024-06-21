import { useEffect, useState } from "react";
import { useParams, useLocation, Link as ReactRouterLink } from "react-router-dom";
import { Flex, Spinner, Heading,Link as ChakraLink, Button } from "@chakra-ui/react";
import { fetchAllArticles } from "../utils/api";
import TopicFilter from "../components/forms/TopicFilter";
import Topic from "../components/containers/Topic";

const AllStories = () => {
    const { slug } = useParams();
    const location = useLocation(); 
    const [isLoading, setIsLoading] = useState(true);
    const [topic, setTopic] = useState(slug);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        setTopic(slug); 
    }, [slug]);

    useEffect(() => {
        setIsLoading(true);
        fetchAllArticles().then(({ articles }) => {
            setStories(articles);
            setIsLoading(false);
        });
    }, [topic])

    const handleTopicChange = (newTopic) => {
        setTopic(newTopic);
    };

    const showTopicFilter = location.pathname === "/stories";
    
    return (
        <Flex as="main" pt={4} direction="column" alignItems="center" >
            <Heading>Stories</Heading>
            <ChakraLink
                as={ReactRouterLink}
                to="/stories/post-story"
                aria-label="Post story"
                mb={2}
            >
                <Button
                    w="150px"
                    tabIndex={-1}
                    size="sm"
                    bg="teal.700"
                    _hover={{ bg: 'teal.500' }}
                    colorScheme="teal"
                >
                    Post a story
                </Button>
            </ChakraLink>
            {isLoading ? <Spinner/> :
            (
                <>
                    {showTopicFilter && <TopicFilter onTopicChange={handleTopicChange} />}
                    <Topic topic={topic} setStories={setStories} stories={stories} />
                </>
            )}
        </Flex>
    )
}

export default AllStories;