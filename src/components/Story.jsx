import { useEffect, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { Heading, Flex, Text, Box, Button, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { fetchArticleById, fetchArticleComments } from "../utils/api";
import { formatDate, capitaliseFirstLetter } from "../utils/helpers";
import CommentCard from "./CommentCard";
import VoteForm from "./VoteForm";
import NewCommentForm from "./NewCommentForm";

const Story = () => {
    const [ isLoading, setIsLoading] = useState(true);
    const [ commentsAreLoading, setCommentsAreLoading] = useState(true);
    const [story, setStory] = useState({});
    const [comments, setComments] = useState([]);
    const [commentFormIsVisible, setCommentFormIsVisible] = useState(false);
    const [showCommentFormButton, setShowCommentFormButton] = useState(true);
    const { article_id } = useParams();

    useEffect(() => {
        fetchArticleById(article_id).then(({ article }) => {
            setStory(article);
            setIsLoading(false);
        })
    },[])
    
    useEffect(() => {
        fetchArticleComments(article_id).then(({comments}) => {
            setComments(comments);
            setCommentsAreLoading(false);
        })
    }, [setComments])

    const handleAddCommentClick = () => {
        setCommentFormIsVisible(true)
        setShowCommentFormButton(false)
    }

    if (isLoading) {
        return <p className="loading" >Loading...</p>
    }

    return (
        <Flex as="main" direction="column" align="center" >
            <Flex as="article" direction="column" m={4} maxW="70%" alignItems="center" >
                <Heading tabIndex={0} fontSize="2xl" textAlign="center" >{story && story.title}</Heading>
                <Text>By <Box as="strong">{story.author}</Box> on <Box as="strong">{formatDate(story.created_at)}</Box></Text>
                <Flex>
                    <Text mr={2} >In: </Text>
                    <ChakraLink as={ReactRouterLink} to={`/topics/${story.topic}`} >{capitaliseFirstLetter(story.topic)}</ChakraLink>
                    </Flex>
                <Text my={2} maxW="80%" minW="320px" >{story.body}</Text>
                <Flex w="100%" justify="space-around" align="center" >
                    <VoteForm story={story} setStory={setStory} />
                    <Text>Comments: {`${story.comment_count}`}</Text>
                </Flex>
            </Flex>
            <Flex as="section" direction="column" align="center" w="50%" >
                <Heading tabIndex={0}  as="h3" fontSize="lg" >Comments</Heading>
                {showCommentFormButton && <Button w="150px" leftIcon={<Icon as={AddIcon} />} size="sm" colorScheme="teal" onClick={handleAddCommentClick}>Add comment</Button>}
                {commentFormIsVisible && <NewCommentForm setComments={setComments} comments={comments} article_id={story.article_id} setCommentFormIsVisible={setCommentFormIsVisible} />}
                {commentsAreLoading && <Text>Loading comments...</Text>}
                { comments.length === 0 ? <Text my={2} >No comments yet...</Text> :
                    comments.map((comment) => (
                        <CommentCard key={comment.comment_id} comment={comment} setComments={setComments} comments={comments}/>
                    ))
                }
            </Flex>
        </Flex>
    )
}

export default Story;