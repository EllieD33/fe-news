import { Box, Button, FormLabel, Textarea, Text, Flex } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { addComment } from "../../utils/api";

const NewCommentForm = ({ setComments, comments, article_id, setCommentFormIsVisible, setShowCommentFormButton }) => {
    const { loggedInUser } = useContext(UserContext)
    const [ isLoading, setIsLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [errors, setErrors] = useState({});

    const handleCloseClick = () => {
        setCommentFormIsVisible(false);
        setShowCommentFormButton(true);
    }

    const handleInputChange = (event) => {
        const inputValue = event.target.value
        setNewComment(inputValue)
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        if (!newComment) {
            setErrors({ commentTextInput: "Comment cannot be blank" })
            return;
        }

        const tempComment = { comment_id: Date.now(), votes: 0, created_at: Date.now(), author: loggedInUser.username, body: newComment, article_id };
        setComments([tempComment, ...comments]);
        setIsLoading(true);

        addComment(article_id, loggedInUser.username, newComment).then((addedComment) => {
            const { comment } = addedComment;
            setComments((prevComments) => [comment, ...prevComments.filter(comm => comm.comment_id !== tempComment.comment_id)]);
            setNewComment('');
            setErrors({}); 
            setIsLoading(false);
            setCommentFormIsVisible(false);
            setShowCommentFormButton(true);
        }).catch((error) => {
            console.error('Error posting comment:', error);
            setComments(comments);
            setIsLoading(false);
            setErrors({ commentTextInput: "Couldn't post comment. Please try again." })
        });
    }

    return (
        <Box as="form" mt={2} mb={2} onSubmit={handleCommentSubmit}>
            <FormLabel fontSize="sm" m={0} pl={1} >Enter your comment:</FormLabel>
            <Textarea name="commentTextInput" value={newComment} placeholder="Type your comment..." onChange={handleInputChange} />
            {errors.commentTextInput && <Text fontSize="sm" color="red">{errors.commentTextInput}</Text>}
            <Flex justify="space-between">
                <Button mt={1} type="submit" colorScheme="teal" size="sm" >{isLoading ? 'Adding...' : 'Add'}</Button>
                <Button mt={1} onClick={handleCloseClick} colorScheme="teal" size="sm" variant="outline" >Close</Button>
            </Flex>
        </Box>
    )
}

export default NewCommentForm;