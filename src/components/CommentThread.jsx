import { useState, useEffect } from "react"
import {
    Heading,
    Flex,
    Text,
    Button,
    Icon,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { fetchArticleComments } from "../utils/api";
import CommentCard from "../components/cards/CommentCard";
import NewCommentForm from "../components/forms/NewCommentForm";




const CommentThread = ({ article_id }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [showCommentFormButton, setShowCommentFormButton] = useState(true);
    const [commentFormIsVisible, setCommentFormIsVisible] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
            fetchArticleComments(article_id).then(({ comments }) => {
                setComments(comments);
                setIsLoading(false);
                setErrors({});
            }).catch((error) => {
                setErrors({ commentFetchFailed: "Failed to load comments"});
                setIsLoading(false);
            });
        }, [setComments]);
    
    const handleAddCommentClick = () => {
        setCommentFormIsVisible(true);
        setShowCommentFormButton(false);
    }

    return (
        <Flex
            as="section"
            direction="column"
            align="center"
            w="50%"
            mt={2}
        >
            <Heading as="h3" fontSize="lg">
                Comments
            </Heading>
            {showCommentFormButton && (
                <Button
                    my={2}
                    w="150px"
                    leftIcon={<Icon as={AddIcon} />}
                    size="sm"
                    colorScheme="teal"
                    bg="teal.700"
                    _hover={{ bg: 'teal.500' }}
                    sx={{ svg: { color: "whiteAlpha.900" } }}
                    onClick={handleAddCommentClick}
                >
                    Add comment
                </Button>
            )}
            {commentFormIsVisible && (
                <NewCommentForm
                    setComments={setComments}
                    comments={comments}
                    article_id={article_id}
                    setCommentFormIsVisible={
                        setCommentFormIsVisible
                    }
                    setShowCommentFormButton={setShowCommentFormButton}
                />
            )}
            {isLoading && <Text>Loading comments...</Text>}
            {errors.commentFetchFailed && <Text>{errors.commentFetchFailed}</Text>}
            {comments.length === 0 ? (
                <Text my={2}>No comments yet...</Text>
            ) : (
                comments.map((comment) => (
                    <CommentCard
                        key={comment.comment_id}
                        comment={comment}
                        setComments={setComments}
                        comments={comments}
                    />
                ))
            )}
        </Flex>
    )
}

export default CommentThread;