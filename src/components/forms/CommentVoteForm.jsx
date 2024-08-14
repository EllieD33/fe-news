import { useContext, useState, useEffect } from "react";
import { Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { TiArrowDownOutline, TiArrowUpOutline, TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { UserContext } from "../../contexts/UserContext";
import { updateCommentVotes } from "../../utils/api";

const CommentVoteForm = ({ comment, setComments }) => {
    const { loggedInUser } = useContext(UserContext);
    const [currentVote, setCurrentVote] = useState(0);
    const [isVoting, setIsVoting] = useState(false); 
    const toast = useToast();

    useEffect(() => {
        if (loggedInUser) {
            const userVote = getUserVote();
            if (userVote !== undefined) {
                setCurrentVote(userVote);
            }
        }
    }, [loggedInUser, comment.comment_id]);

    const getUserVote = () => {
        const votes = JSON.parse(localStorage.getItem('userVotes')) || {};
        return votes[`${loggedInUser.username}_comment_${comment.comment_id}`];
    };

    const updateLocalVotes = (newVote) => {
        const votes = JSON.parse(localStorage.getItem('userVotes')) || {};
        const voteKey = `${loggedInUser.username}_comment_${comment.comment_id}`;

        if (newVote === 0) {
            delete votes[voteKey];
        } else {
            votes[voteKey] = newVote;
        }
        localStorage.setItem('userVotes', JSON.stringify(votes));
    };

    const handleVote = (voteType) => {
        if (isVoting) return;
        setIsVoting(true);
        
        const newVote = currentVote === voteType ? 0 : voteType;
        const voteDifference = newVote - currentVote;
        const originalVotes = comment.votes;

        setCurrentVote(newVote);
        setComments((prevComments) =>
            prevComments.map((comm) =>
                comm.comment_id === comment.comment_id
                    ? { ...comm, votes: comm.votes + voteDifference }
                    : comm
            )
        );

        updateCommentVotes(comment.comment_id, voteDifference).then((data) => {
            const { comment: updatedComment } = data;
            setComments((prevComments) =>
                prevComments.map((comm) =>
                    comm.comment_id === updatedComment.comment_id
                        ? { ...comm, ...updatedComment }
                        : comm
                )
            );
            updateLocalVotes(newVote);
        }).catch((error) => {
            revertVoteChanges(originalVotes);
        }).finally(() => {
            setIsVoting(false);
        });
    }

    const revertVoteChanges = (originalVotes) => {
        setCurrentVote(currentVote);
        setComments((prevComments) =>
            prevComments.map((comm) =>
                comm.comment_id === comment.comment_id
                    ? { ...comm, votes: originalVotes }
                    : comm
            )
        );
        toast({
            title: "Failed to update votes. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleClick = (event) => {
        if (!loggedInUser) {
            toast({
                title: "You must be logged in to vote.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            event.preventDefault();
        } else {
            const voteType = event.currentTarget.name === 'upVote' ? 1 : -1;
            handleVote(voteType);
        }
    };

    return (
        <Flex as="form" alignItems="center" >
            <IconButton 
                type="button" 
                onClick={handleClick} 
                isDisabled={isVoting} 
                name="downVote" 
                border="none" 
                tabIndex={0} 
                mr={1} 
                icon={currentVote === -1 ? <TiArrowDownThick size="24px" /> : <TiArrowDownOutline size="24px" />} 
                aria-label='down vote comment' 
                variant="outline" 
                colorScheme="teal" 
                size="sm" 
            />
            <Text>{`${comment.votes}`}</Text>
            <IconButton 
                type="button" 
                onClick={handleClick} 
                isDisabled={isVoting} 
                name="upVote" 
                border="none" 
                tabIndex={0} 
                ml={1} 
                icon={currentVote === 1 ? <TiArrowUpThick size="24px" /> : <TiArrowUpOutline size="24px" />} 
                aria-label='up vote comment' 
                variant="outline" 
                colorScheme="teal" 
                size="sm" 
            />
        </Flex>
    )
}
export default CommentVoteForm;
