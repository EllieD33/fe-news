import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { fetchAllArticles } from "../utils/api";
import TopicFilter from "./TopicFilter";
import Topic from "./Topic";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [topic, setTopic] = useState("");
    const [stories, setStories] = useState([]);

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

    if (isLoading) {
        return <p className="loading" >Loading...</p>
    }
    
    return (
        <Flex as="main" direction="column" alignItems="center">
            <section tabIndex={0}>
                <Text>Welcome to NewsHub. Enjoy your time here, and remember: It's nice to be nice!!!</Text>
            </section>
            <TopicFilter onTopicChange={handleTopicChange} />
            <Topic topic={topic} setStories={setStories} stories={stories} />
        </Flex>
    )
}

export default Home;