import { Card, Heading, IconButton, Text, Flex } from "@chakra-ui/react"
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { formatDate, formatTime } from "../utils/helpers"
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteComment } from "../utils/api";

const CommentCard = ({ comment, setComments, comments }) => {
    const { loggedInUser } = useContext(UserContext)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = () => {
        setIsDeleting(true);
        deleteComment(comment.comment_id);
        setComments(comments.filter(comm => comm.comment_id !== comment.comment_id));
    }

    return (
        <Card tabIndex={0} as="article" m={2} p={2} minW="300px" maxW="480px" width={{ base: "100%", sm: "350px", md: "480px" }} >
            <Heading as="h4" fontSize="md" >{comment.author} on {formatDate(comment.created_at)} at {formatTime(comment.created_at)}</Heading>
            <Text my={2} >{comment.body}</Text>
            <Flex justify="space-between" align="center" >
                <Text>Votes: {comment.votes}</Text>
                {loggedInUser.username === comment.author ? <IconButton isDisabled={isDeleting} aria-label="Delete comment" onClick={handleDelete} icon={<DeleteIcon size="24px" />} w="20px" colorScheme="teal" size="sm" /> : null}
            </Flex>
        </Card>
    )
}

export default CommentCard;