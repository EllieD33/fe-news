import { Card, Heading, IconButton, Text, Flex } from "@chakra-ui/react"
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { formatDate, formatTime } from "../utils/helpers"
import { DeleteIcon } from "@chakra-ui/icons";

const CommentCard = ({ comment }) => {
    const { loggedInUser } = useContext(UserContext)

    return (
        <Card tabIndex={0} as="article" m={2} p={2} minW="300px" maxW="480px" width={{ base: "100%", sm: "350px", md: "480px" }} >
            <Heading as="h4" fontSize="md" >{comment.author} on {formatDate(comment.created_at)} at {formatTime(comment.created_at)}</Heading>
            <Text my={2} >{comment.body}</Text>
            <Flex justify="space-between" align="center" >
                <Text>Votes: {comment.votes}</Text>
                {loggedInUser.username === comment.author ? <IconButton aria-label="Delete comment" icon={<DeleteIcon size="24px" />} w="20px" colorScheme="teal" size="sm" /> : null}
            </Flex>
        </Card>
    )
}

export default CommentCard;