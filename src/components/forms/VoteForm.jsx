import { useContext, useState, useEffect } from "react";
import { IconButton, Text, Flex } from "@chakra-ui/react";
import { TiArrowDownOutline, TiArrowUpOutline, TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { UserContext } from "../../contexts/UserContext";
import { updateArticleVotes } from "../../utils/api";

const VoteForm = ({ story, setStory }) => {
    const { loggedInUser } = useContext(UserContext);
    const [currentVote, setCurrentVote] = useState(0);
    const [isVoting, setIsVoting] = useState(false); 
    const [commentCount, setCommentCount] = useState(story.comment_count);

    useEffect(() => {
        const votes = JSON.parse(localStorage.getItem('userVotes')) || {};
        const userVote = votes[`${loggedInUser.username}_${story.article_id}`];
        if (userVote !== undefined) {
            setCurrentVote(userVote);
        }
    }, [loggedInUser.username, story.article_id]);

    const handleVote = (event) => {
        event.preventDefault();

        if (isVoting) return;

        setIsVoting(true);
        const voteType = event.currentTarget.name === 'upVote' ? 1 : -1;
        let newVote = currentVote === voteType ? 0 : voteType;
        const voteDifference = newVote - currentVote;
        const originalVotes = story.votes;

        setStory(prevStory => ({
            ...prevStory,
            votes: prevStory.votes + voteDifference
        }));

        updateArticleVotes(story.article_id, voteDifference).then((updatedStory) => {
            const { article } = updatedStory;
            setStory({ ...article, comment_count: commentCount });
            setCurrentVote(newVote);
            
            const votes = JSON.parse(localStorage.getItem('userVotes')) || {};
            if (newVote === 0) {
                delete votes[`${loggedInUser.username}_${story.article_id}`];
            } else {
                votes[`${loggedInUser.username}_${story.article_id}`] = newVote;
            }
            localStorage.setItem('userVotes', JSON.stringify(votes));
        }).catch((error) => {
            setStory(prevStory => ({
                ...prevStory,
                votes: originalVotes
            }));
            alert('Failed to update votes. Please try again.');
        }).finally(() => {
            setIsVoting(false);
        });
    }

    return (
        <Flex as="form" align="center">
            <IconButton 
                type="submit" 
                onClick={handleVote} 
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
                type="submit" 
                onClick={handleVote} 
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
