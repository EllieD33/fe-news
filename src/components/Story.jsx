import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/api";
import { formatDate } from "../utils/helpers";
import { Heading, Flex, Text, Box } from "@chakra-ui/react";

const Story = () => {
    const [story, setStory] = useState({})
    const { article_id } = useParams();

    useEffect(() => {
        fetchArticleById(article_id).then(({ article }) => {
            setStory(article)
        })
    },[])

    return (
        <Flex as="main" tabIndex={0} direction="column" align="center" >
            <Flex as="article" direction="column" m={4} maxW="70%" alignItems="center" >
                <Heading tabIndex={0} fontSize="2xl" textAlign="center" >{story && story.title}</Heading>
                <Text>By <Box as="strong">{story.author}</Box> on <Box as="strong">{formatDate(story.created_at)}</Box></Text>
                <Text>Category: {`${story.topic}`} </Text>
                <Text my={2} maxW="80%" >{story.body}</Text>
                <Flex w="100%" justify="space-around" >
                    <Text>Votes: {`${story.votes}`}</Text>
                    <Text>Comments: {`${story.comment_count}`}</Text>
                </Flex>
            </Flex>
            <Flex as="section" tabIndex={0} >
                <Heading as="h3" fontSize="lg" >Comments</Heading>
            </Flex>
        </Flex>
    )
}

export default Story;