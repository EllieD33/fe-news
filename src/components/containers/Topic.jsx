import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Heading, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { fetchAllArticles } from "../../utils/api";
import { capitaliseFirstLetter } from '../../utils/helpers';
import PreviewCard from "../cards/PreviewCard";
import SortForm from "../forms/SortForm";
import PageNotFound from "../PageNotFound"

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
        <Flex as="section" direction="column" m={4} py={4} border="none" justify="center" align="center" >
            <Flex maxW="500px" w="80%" justify="space-between" align="center">
                <Heading as="h3" textAlign="center" fontSize="2xl">{topic ? capitaliseFirstLetter(topic) : 'All stories'}</Heading>
                <SortForm setSearchParams={setSearchParams} />
            </Flex>
            <Flex flex={1} wrap="wrap" align="center" justify="center" >
                {isLoading ? <Spinner size='xl' color='teal.700' my={50} /> :
                    stories.map((article) => (
                        <PreviewCard key={article.article_id} article={article} />
                    ))
                }
                {stories.length === 0 && !isLoading && <Text mt={4} p={2} >No stories on this topic yet - be the first to add one!</Text>}
            </Flex>
        </Flex>
    )
}

export default Topic;