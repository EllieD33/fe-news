import { Card, Heading, Text, Flex } from "@chakra-ui/react";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";
import { formatDate, formatTime } from "../../utils/helpers";
import { deleteComment } from "../../utils/api";
import DeleteButton from "../DeleteButton";
import VoteForm from "../forms/VoteForm";
import { updateCommentVotes } from "../../utils/api";

const CommentCard = ({ comment, setComments, comments }) => {
    const { loggedInUser } = useContext(UserContext);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleDelete = () => {
        setIsDeleting(true);
        deleteComment(comment.comment_id)
            .then(() => {
                setErrors({});
                setComments(
                    comments.filter(
                        (comm) => comm.comment_id !== comment.comment_id
                    )
                );
            })
            .catch((error) => {
                setIsDeleting(false);
                setErrors({
                    deleteComment: "Couldn't delete comment. Please try again.",
                });
            });
    };

    const onDelete = () => {
        handleDelete();
    };

    return (
        <Card
            as="article"
            m={2}
            p={2}
            minW="300px"
            maxW="480px"
            width={{ base: "100%", sm: "350px", md: "480px" }}
        >
            <Heading as="h4" fontSize="md">
                {comment.author} on {formatDate(comment.created_at)} at{" "}
                {formatTime(comment.created_at)}
            </Heading>
            <Text my={2}>{comment.body}</Text>
            <Flex justify="space-between" align="center">
                <VoteForm
                    entityType="comment"
                    entityId={comment.comment_id}
                    entityVotes={comment.votes}
                    setEntity={setComments}
                    updateVotesApi={updateCommentVotes}
                />
                {loggedInUser && loggedInUser.username === comment.author ? (
                    <DeleteButton
                        thingBeingDeleted={"comment"}
                        onDelete={onDelete}
                        isDeleting={isDeleting}
                    />
                ) : null}
            </Flex>
            {errors.deleteComment && (
                <Text fontSize="sm" color="red">
                    {errors.deleteComment}
                </Text>
            )}
        </Card>
    );
};

export default CommentCard;
