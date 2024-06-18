import { IconButton, Text, Flex } from "@chakra-ui/react";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { updateArticleVotes } from "../utils/api";

const VoteForm = ({ story, setStory }) => {

    const handleVote = (event) => {
        event.preventDefault();

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
            setStory(article)
        }).catch((error) => {
            console.error('Error updating story votes:', error);
            setStory(prevStory => ({
                ...prevStory,
                votes: originalVotes
            }));
            alert('Failed to update votes. Please try again.')
        });
    }

    return (
        <Flex as="form" align="center">
            <IconButton type="submit" onClick={handleVote} name="downVote" border="none" tabIndex={0} mr={1} icon={<TiArrowDownOutline size="24px" />} aria-label='down vote article' variant="outline" colorScheme="teal" size="sm" />
            <Text>Votes: {`${story.votes}`}</Text>
            <IconButton type="submit" onClick={handleVote} name="upVote" border="none" tabIndex={0} ml={1} icon={<TiArrowUpOutline size="24px" />} aria-label='up vote article' variant="outline" colorScheme="teal" size="sm" />
        </Flex>
    )
}

export default VoteForm;