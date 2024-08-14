import { useContext, useState, useEffect } from "react";
import { IconButton, Text, Flex, useToast } from "@chakra-ui/react";
import { TiArrowDownOutline, TiArrowUpOutline, TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { UserContext } from "../../contexts/UserContext";
import { updateArticleVotes } from "../../utils/api";

const VoteForm = ({ story, setStory }) => {
    const { loggedInUser } = useContext(UserContext);
    const [currentVote, setCurrentVote] = useState(0);
    const [isVoting, setIsVoting] = useState(false); 
    const [commentCount, setCommentCount] = useState(story.comment_count);
    const toast = useToast();

    useEffect(() => {
        if (loggedInUser) {
            const userVote = getUserVote();
            if (userVote !== undefined) {
                setCurrentVote(userVote);
            }
        }
    }, [loggedInUser, story.article_id]);

    const getUserVote = () => {
        const votes = JSON.parse(localStorage.getItem('userVotes')) || {};
        return votes[`${loggedInUser.username}_${story.article_id}`];
    };

    const updateLocalVotes = (newVote) => {
        const votes = JSON.parse(localStorage.getItem('userVotes')) || {};
        const voteKey = `${loggedInUser.username}_${story.article_id}`;

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
        const originalVotes = story.votes;

        setCurrentVote(newVote);
        setStory(prevStory => ({
            ...prevStory,
            votes: prevStory.votes + voteDifference
        }));

        updateArticleVotes(story.article_id, voteDifference).then((updatedStory) => {
            const { article } = updatedStory;
            setStory({ ...article, comment_count: commentCount });
            updateLocalVotes(newVote);
        }).catch((error) => {
            revertVoteChanges(originalVotes);
        }).finally(() => {
            setIsVoting(false);
        });
    }

    const revertVoteChanges = (originalVotes) => {
        setCurrentVote(currentVote);
        setStory(prevStory => ({
            ...prevStory,
            votes: originalVotes
        }));
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
        <Flex as="form" align="center">
            <IconButton 
                type="button" 
                onClick={handleClick} 
                isDisabled={isVoting} 
                name="downVote" 
                border="none" 
                tabIndex={0} 
                mr={1} 
                icon={currentVote === -1 ? <TiArrowDownThick size="24px" /> : <TiArrowDownOutline size="24px" />} 
                aria-label='down vote article' 
                variant="outline" 
                colorScheme="teal" 
                size="sm" 
            />
            <Text>{`${story.votes}`}</Text>
            <IconButton 
                type="button" 
                onClick={handleClick} 
                isDisabled={isVoting} 
                name="upVote" 
                border="none" 
                tabIndex={0} 
                ml={1} 
                icon={currentVote === 1 ? <TiArrowUpThick size="24px" /> : <TiArrowUpOutline size="24px" />} 
                aria-label='up vote article' 
                variant="outline" 
                colorScheme="teal" 
                size="sm" 
            />
        </Flex>
    );
}

export default VoteForm;
