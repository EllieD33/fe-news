import { useEffect, useState } from "react";
import { fetchAllArticles } from "../utils/api";
import PreviewCard from "./PreviewCard";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import TopicFilter from "./TopicFilter";

const Home = () => {
    const [ isLoading, setIsLoading] = useState(true)
    const [stories, setStories] = useState([])

    useEffect(() => {
        setIsLoading(true);
        fetchAllArticles().then(({ articles }) => {
            setStories(articles);
            setIsLoading(false);
        });
    }, [])

    if (isLoading) {
        return <p className="loading" >Loading...</p>
    }
    
    return (
        <Flex as="main" direction="column" alignItems="center">
            <section tabIndex={0}>
                <Text>Welcome to NewsHub. Enjoy your time here, and remember: It's nice to be nice!!!</Text>
            </section>
            <TopicFilter/>
            <Container as="section" tabIndex={0} m={4} py={4} border="2px" direction="column" justify="center" >
                <Heading textAlign="center" fontSize="2xl">All stories</Heading>
                {
                    stories.map((article) => (
                        <PreviewCard key={article.article_id} article={article} />
                    ))
                }
            </Container>
        </Flex>
    )
}

export default Home;