import { useEffect, useState } from "react";
import { Flex, Text, Heading, SkipNavContent, Spinner } from "@chakra-ui/react";
import { fetchAllArticles } from "../utils/api";
import FeaturedStories from "../components/containers/FeaturedStories";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [recentStories, setRecentStories] = useState([]);
    const [mostPopularStories, setMostPopularStories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const recentStoriesPromise = fetchAllArticles(null, "created_at", "DESC", 3).then(({ articles }) => articles);
        
        const popularStoriesPromise = fetchAllArticles(null, "votes", "DESC", 3).then(({ articles }) => articles);

        Promise.all([recentStoriesPromise, popularStoriesPromise])
            .then(([recentArticles, popularArticles]) => {
                setRecentStories(recentArticles);
                setMostPopularStories(popularArticles);
                setError("");
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setError('There was an issue fetching the articles. Please refresh or try again later.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    return (
        <>
            <SkipNavContent />
            <Flex id="main" as="main" pt={6} direction="column" alignItems="center" >
                <section >
                    <Heading fontSize="3xl" textAlign="center">Welcome to NewsHub</Heading>
                    <Text mx={2} textAlign="center">Enjoy your time here, and remember: It's nice to be nice!!!</Text>
                </section>
                {isLoading ? <Spinner size='xl' color='teal.700' my={50} /> :
                error ? (
                    <Text my={50} fontSize="xl" textAlign="center" >{error}</Text>
                ) : (
                    <Flex wrap="wrap" align="flex-start" justify="center">
                        <FeaturedStories title="What's new" subtitle="Recently added stories" stories={recentStories} />
                        <FeaturedStories title="Trending" subtitle="Most popular stories" stories={mostPopularStories} />
                    </Flex>
                )}
            </Flex>
        </>
    )
}

export default Home;