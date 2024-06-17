import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/api";
import { formatDate } from "../utils/helpers";
import { Heading, Flex, Center, Text, Box } from "@chakra-ui/react";

const Story = () => {
    const [story, setStory] = useState({})
    const { article_id } = useParams();

    useEffect(() => {
        fetchArticleById(article_id).then(({ article }) => {
            setStory(article)
        })
    },[])

    return (
        <Center>
            <Flex as="article" direction="column" m={4} maxW="70%" alignItems="center" >
                <Heading fontSize="2xl" textAlign="center" >{story && story.title}</Heading>
                <Text>By <Box as="strong">{story.author}</Box> on <Box as="strong">{formatDate(story.created_at)}</Box></Text>
                <Text>Category: {`${story.topic}`} </Text>
                <Text my={2} maxW="80%" >{story.body}</Text>
                <Flex w="100%" justify="space-around" >
                    <Text>Votes: {`${story.votes}`}</Text>
                    <Text>Comments: {`${story.comment_count}`}</Text>
                </Flex>
            </Flex>
        </Center>
    )
}

export default Story;