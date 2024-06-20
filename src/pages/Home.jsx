import { useEffect, useState } from "react";
import { Flex, Text, Heading } from "@chakra-ui/react";
import { fetchAllArticles } from "../utils/api";
import FeaturedStories from "../components/containers/FeaturedStories";

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
                <Heading fontSize="3xl" textAlign="center">Welcome to NewsHub</Heading>
                <Text mx={2} textAlign="center">Enjoy your time here, and remember: It's nice to be nice!!!</Text>
            </section>
            <Flex wrap="wrap" align="center" justify="center">
                <FeaturedStories title="What's new" subtitle="Recently added stories" stories={recentStories} isLoading={isLoading} />
                <FeaturedStories title="Trending" subtitle="Most popular stories" stories={mostPopularStories} isLoading={isLoading} />
            </Flex>
    </Flex>
    )
}

export default Home;