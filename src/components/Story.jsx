import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchArticleComments } from "../utils/api";
import { formatDate } from "../utils/helpers";
import { Heading, Flex, Text, Box } from "@chakra-ui/react";
import CommentCard from "./CommentCard";

const Story = () => {
    const [story, setStory] = useState({})
    const [comments, setComments] = useState([])
    const { article_id } = useParams();

    useEffect(() => {
        fetchArticleById(article_id).then(({ article }) => {
            setStory(article);
        })
        fetchArticleComments(article_id).then(({comments}) => {
            setComments(comments);
        })
    },[])

    return (
        <Flex as="main" direction="column" align="center" >
            <Flex as="article" direction="column" m={4} maxW="70%" alignItems="center" >
                <Heading tabIndex={0} fontSize="2xl" textAlign="center" >{story && story.title}</Heading>
                <Text>By <Box as="strong">{story.author}</Box> on <Box as="strong">{formatDate(story.created_at)}</Box></Text>
                <Text>Category: {`${story.topic}`} </Text>
                <Text my={2} maxW="80%" minW="320px" >{story.body}</Text>
                <Flex w="100%" justify="space-around" >
                    <Text>Votes: {`${story.votes}`}</Text>
                    <Text>Comments: {`${story.comment_count}`}</Text>
                </Flex>
            </Flex>
            <Flex as="section" direction="column" align="center" w="50%" >
                <Heading tabIndex={0}  as="h3" fontSize="lg" >Comments</Heading>
                {
                    comments.map((comment) => (
                        <CommentCard key={comment.comment_id} comment={comment} />
                    ))
                }
            </Flex>
        </Flex>
    )
}

export default Story;