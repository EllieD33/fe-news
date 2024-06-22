import { useContext, useState, useEffect } from "react";
import { IconButton, Text, Flex } from "@chakra-ui/react";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { UserContext } from "../../contexts/UserContext";
import { updateArticleVotes } from "../../utils/api";

const VoteForm = ({ story, setStory }) => {
    const { loggedInUser } = useContext(UserContext);
    const [hasVoted, setHasVoted] = useState(false);
    const [isVoting, setIsVoting] = useState(false); 
    const [commentCount, setCommentCount] = useState(story.comment_count);

    useEffect(() => {
        const userVoteKey = `${loggedInUser.username}_voted_${story.article_id}`;
        const userHasVoted = localStorage.getItem(userVoteKey) === 'true';
        setHasVoted(userHasVoted);
    }, [loggedInUser.username, story.article_id]);

    const handleVote = (event) => {
        event.preventDefault();
        setIsVoting(true);

        if (hasVoted) {
            alert('You have already voted on this story.');
            return;
        }

        let votes;
        const originalVotes = story.votes;

        if (event.currentTarget.name === 'downVote') votes = -1;
        if (event.currentTarget.name === 'upVote') votes = 1;

        setStory(prevStory => ({
            ...prevStory,
            votes: prevStory.votes + votes
        }));
        updateArticleVotes(story.article_id, votes).then((updatedStory) => {
            const { article } = updatedStory;
            setStory({...article, comment_count: commentCount});
            setHasVoted(true);
            setIsVoting(false);
            const userVoteKey = `${loggedInUser.username}_voted_${story.article_id}`;
            localStorage.setItem(userVoteKey, 'true');
        }).catch((error) => {
            setStory(prevStory => ({
                ...prevStory,
                votes: originalVotes
            }));
            setIsVoting(false);
            alert('Failed to update votes. Please try again.')
        });
    }

    return (
        <Flex as="form" align="center">
            <IconButton type="submit" onClick={handleVote} isDisabled={hasVoted || isVoting} name="downVote" border="none" tabIndex={0} mr={1} icon={<TiArrowDownOutline size="24px" />} aria-label='down vote article' variant="outline" colorScheme="teal" size="sm" />
            <Text>{`${story.votes}`}</Text>
            <IconButton type="submit" onClick={handleVote} isDisabled={hasVoted || isVoting} name="upVote" border="none" tabIndex={0} ml={1} icon={<TiArrowUpOutline size="24px" />} aria-label='up vote article' variant="outline" colorScheme="teal" size="sm" />
        </Flex>
    )
}

export default VoteForm;