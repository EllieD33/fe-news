import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { fetchAllArticles } from "../utils/api";
import TopicFilter from "./TopicFilter";
import Topic from "./Topic";

const Home = () => {
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

    const showTopicFilter = ['/home', '/', '/stories'].includes(location.pathname);

    if (isLoading) {
        return <p className="loading" >Loading...</p>
    }
    
    return (
        <Flex as="main" direction="column" alignItems="center">
            <section tabIndex={0}>
                <Text>Welcome to NewsHub. Enjoy your time here, and remember: It's nice to be nice!!!</Text>
            </section>
            {showTopicFilter && <TopicFilter onTopicChange={handleTopicChange} />}
            <Topic topic={topic} setStories={setStories} stories={stories} />
        </Flex>
    )
}

export default Home;