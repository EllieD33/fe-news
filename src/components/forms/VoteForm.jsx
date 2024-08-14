import { useContext, useState, useEffect } from "react";
import { Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { TiArrowDownOutline, TiArrowUpOutline, TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { UserContext } from "../../contexts/UserContext";

const VoteForm = ({
    entityType,
    entityId,
    entityVotes,
    setEntity,
    updateVotesApi,
    commentCount,
}) => {
    const { loggedInUser } = useContext(UserContext);
    const [currentVote, setCurrentVote] = useState(0);
    const [isVoting, setIsVoting] = useState(false);
    const [originalVotes, setOriginalVotes] = useState(entityVotes);
    const toast = useToast();

    useEffect(() => {
        if (loggedInUser) {
            const userVote = getUserVote();
            if (userVote !== undefined) {
                setCurrentVote(userVote);
            }
        }
    }, [loggedInUser, entityId]);

    const getUserVote = () => {
        const votes = JSON.parse(localStorage.getItem("userVotes")) || {};
        return votes[`${loggedInUser.username}_${entityType}_${entityId}`];
    };

    const updateLocalVotes = (newVote) => {
        const votes = JSON.parse(localStorage.getItem("userVotes")) || {};
        const voteKey = `${loggedInUser.username}_${entityType}_${entityId}`;

        if (newVote === 0) {
            delete votes[voteKey];
        } else {
            votes[voteKey] = newVote;
        }
        localStorage.setItem("userVotes", JSON.stringify(votes));
    };

    const handleVote = (voteType) => {
        if (isVoting) return;
        setIsVoting(true);

        const newVote = currentVote === voteType ? 0 : voteType;
        const voteDifference = newVote - currentVote;

        setCurrentVote(newVote);

        if (entityType === "comment") {
            setEntity((prevComments) => {
                if (!Array.isArray(prevComments)) {
                    console.error("Expected an array of comments.");
                    return prevComments;
                }

                return prevComments.map((comment) =>
                    comment.comment_id === entityId
                        ? { ...comment, votes: comment.votes + voteDifference }
                        : comment
                );
            });
        } else if (entityType === "article") {
            setEntity((prevStory) => ({
                ...prevStory,
                votes: prevStory.votes + voteDifference,
                ...(commentCount !== undefined && {
                    comment_count: commentCount,
                }),
            }));
        }

        updateVotesApi(entityId, voteDifference)
            .then((data) => {
                const updatedEntity =
                    entityType === "article" ? data.article : data.comment;
                setEntity((prevEntity) => {
                    if (entityType === "article") {
                        return {
                            ...updatedEntity,
                            votes: updatedEntity.votes,
                            ...(commentCount !== undefined && {
                                comment_count: commentCount,
                            }),
                        };
                    } else {
                        if (!Array.isArray(prevEntity)) {
                            console.error("Expected an array of comments.");
                            return prevEntity;
                        }

                        return prevEntity.map((comment) =>
                            comment.comment_id === entityId
                                ? { ...updatedEntity, votes: updatedEntity.votes }
                                : comment
                        );
                    }
                });
                updateLocalVotes(newVote);
            })
            .catch(() => {
                revertVoteChanges(originalVotes);
            })
            .finally(() => {
                setIsVoting(false);
            });
    };

    const revertVoteChanges = (originalVotes) => {
        setCurrentVote(currentVote);
        setEntity((prevEntity) => {
            if (entityType === "article") {
                return {
                    ...prevEntity,
                    votes: originalVotes,
                    ...(commentCount !== undefined && {
                        comment_count: commentCount,
                    }),
                };
            } else {
                if (!Array.isArray(prevEntity)) {
                    console.error("Expected an array of comments.");
                    return prevEntity;
                }

                return prevEntity.map((comment) =>
                    comment.comment_id === entityId
                        ? { ...comment, votes: originalVotes }
                        : comment
                );
            }
        });
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
            const voteType = event.currentTarget.name === "upVote" ? 1 : -1;
            handleVote(voteType);
        }
    };

    return (
        <Flex as="form" align="center">
            <IconButton
                type="button"
                onClick={handleClick}
                isDisabled={isVoting}
                name="downVote"
                border="none"
                tabIndex={0}
                mr={1}
                icon={
                    currentVote === -1 ? (
                        <TiArrowDownThick size="24px" />
                    ) : (
                        <TiArrowDownOutline size="24px" />
                    )
                }
                aria-label={`down vote ${entityType}`}
                variant="outline"
                colorScheme="teal"
                size="sm"
            />
            <Text>{`${entityVotes}`}</Text>
            <IconButton
                type="button"
                onClick={handleClick}
                isDisabled={isVoting}
                name="upVote"
                border="none"
                tabIndex={0}
                ml={1}
                icon={
                    currentVote === 1 ? (
                        <TiArrowUpThick size="24px" />
                    ) : (
                        <TiArrowUpOutline size="24px" />
                    )
                }
                aria-label={`up vote ${entityType}`}
                variant="outline"
                colorScheme="teal"
                size="sm"
            />
        </Flex>
    );
};

export default VoteForm;
