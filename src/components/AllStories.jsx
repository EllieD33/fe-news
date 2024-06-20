import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { fetchAllArticles } from "../utils/api";
import TopicFilter from "./TopicFilter";
import Topic from "./Topic";

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
        <Flex id="main" as="main" pt={4} direction="column" alignItems="center" >
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