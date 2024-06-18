import { useState, useEffect } from "react";
import { fetchAllArticles } from "../utils/api";
import PreviewCard from "./PreviewCard";
import { Heading, Container } from "@chakra-ui/react";
import { capitaliseFirstLetter } from '../utils/helpers';

const Topic = ({ topic, setStories, stories }) => {
    const [ isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true);
        fetchAllArticles(topic).then(({ articles }) => {
            setStories(articles);
            setIsLoading(false);
        });
    }, [topic])

    if (isLoading) {
        return <p className="loading" >Loading...</p>
    }

    return (
        <Container as="section" tabIndex={0} m={4} py={4} border="2px" direction="column" justify="center" >
            <Heading textAlign="center" fontSize="2xl">{topic ? capitaliseFirstLetter(topic) : 'All'} stories</Heading>
            {
                    stories.map((article) => (
                        <PreviewCard key={article.article_id} article={article} />
                    ))
                }
        </Container>
    )
}

export default Topic;