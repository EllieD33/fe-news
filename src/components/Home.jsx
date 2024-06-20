import { useEffect, useState } from "react";
import { Flex, Spinner, Text, Heading } from "@chakra-ui/react";
import { fetchAllArticles } from "../utils/api";
import PreviewCard from "./PreviewCard";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [recentStories, setRecentStories] = useState([]);
    const [mostPopularStories, setMostPopularStories] = useState([])

    useEffect(() => {
        fetchAllArticles(null, "created_at", "DESC", 3).then(({ articles }) => {
            setRecentStories(articles);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching articles:', error);
            setIsLoading(false);
        });
    }, [])

    useEffect(() => {
        fetchAllArticles(null, "votes", "DESC", 3).then(({ articles }) => {
            setMostPopularStories(articles);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching articles:', error);
            setIsLoading(false);
        });
    }, [])

    return (
        <Flex id="main" as="main" pt={4} direction="column" alignItems="center" >
            <section >
                <Text mx={2} textAlign="center" >Welcome to NewsHub. Enjoy your time here, and remember: It's nice to be nice!!!</Text>
            </section>
            <Flex>
                <Flex direction="column" align="center">
                    <Heading>What's new?</Heading>
                    <Text>Recently added stories</Text>
                    <Flex direction="column" align="center">
                        {isLoading ? <Spinner/> :
                            recentStories.map((article) => (
                                <PreviewCard key={article.article_id} article={article} />
                            ))
                        }
                    </Flex>
                </Flex>
                <Flex direction="column" align="center">
                    <Heading>Trending</Heading>
                    <Text>Most popular stories</Text>
                    <Flex direction="column" align="center">
                        {isLoading ? <Spinner/> :
                            mostPopularStories.map((article) => (
                                <PreviewCard key={article.article_id} article={article} />
                            ))
                        }
                    </Flex>
                </Flex>
            </Flex>
    </Flex>
    )
}

export default Home;