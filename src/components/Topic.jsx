import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Heading, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { fetchAllArticles } from "../utils/api";
import { capitaliseFirstLetter } from '../utils/helpers';
import PreviewCard from "./PreviewCard";
import SortForm from "./SortForm";
import PageNotFound from "./PageNotFound"

const Topic = ({ topic, setStories, stories }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataFetchFailed, setDataFetchFailed] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'DESC';

    useEffect(() => {
        setIsLoading(true);
        fetchAllArticles(topic, sortBy, sortOrder).then(({ articles }) => {
            setStories(articles);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false)
            setDataFetchFailed(true)
        });
    }, [topic, sortBy, sortOrder])

    if(dataFetchFailed){
        return <PageNotFound/>
    }

    return (
        <Container as="section" tabIndex={0} m={4} py={4} border="none" direction="column" justify="center" >
            <Flex justify="space-between" align="center">
                <Heading textAlign="center" fontSize="2xl">{topic ? capitaliseFirstLetter(topic) : 'All'} stories</Heading>
                <SortForm setSearchParams={setSearchParams} />
            </Flex>
            <Flex direction="column" align="center">
                {isLoading ? <Spinner/> :
                    stories.map((article) => (
                        <PreviewCard key={article.article_id} article={article} />
                    ))
                }
            </Flex>
        </Container>
    )
}

export default Topic;