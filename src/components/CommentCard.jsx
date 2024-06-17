import { Card, Heading, Text } from "@chakra-ui/react"
import { formatDate, formatTime } from "../utils/helpers"

const CommentCard = ({ comment }) => {
    return (
        <Card as="article" m={2} p={2} minW="300px" maxW="480px" width={{ base: "100%", sm: "350px", md: "480px" }} >
            <Heading as="h4" fontSize="md" >{comment.author} on {formatDate(comment.created_at)} at {formatTime(comment.created_at)}</Heading>
            <Text my={2} >{comment.body}</Text>
            <Text>Votes: {comment.votes}</Text>
        </Card>
    )
}

export default CommentCard;