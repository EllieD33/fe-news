import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Heading, Image, Text, Box, Link as ChakraLink, Icon, IconButton } from "@chakra-ui/react";
import { FaRegCommentAlt } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import DeleteButton from "../DeleteButton";
import VoteForm from "../forms/VoteForm";
import Share from "../Share";
import { formatDate, capitaliseFirstLetter } from "../../utils/helpers";


const FullStory = ({ story, setStory, loggedInUser, onDelete, isDeleting, errors, handleShareClick, shareIconsVisible, articleUrl }) => {
    return (
        <Flex
            as="article"
            direction="column"
            m={4}
            maxW="70%"
            alignItems="center"
        >
            <Heading mb={2} fontSize={ {base: "2xl", sm: "3xl"}} textAlign="center">
                {story && story.title}
            </Heading>
            <Text>
                By <Box as="strong">{story.author}</Box> on{" "}
                <Box as="strong">
                    {formatDate(story.created_at)}
                </Box>
            </Text>
            <Flex>
                <Text mr={2}>In: </Text>
                <ChakraLink
                    as={ReactRouterLink}
                    to={`/topics/${story.topic}`}
                >
                    {capitaliseFirstLetter(story.topic)}
                </ChakraLink>
            </Flex>
            {loggedInUser && story.author === loggedInUser.username && 
                <Flex>
                    <DeleteButton thingBeingDeleted={'story'} onDelete={onDelete} isDeleting={isDeleting} />
                    {errors.deleteFailed && <Text fontSize="sm" color="red" >{errors.deleteFailed}</Text> }
                </Flex>
            }
            <Image maxW="500px" src={story.article_img_url} alt="Image relating to story" />
            <Text my={2} maxW="80%" minW="320px">
                {story.body}
            </Text>
            <Flex w="100%" justify="space-around" align="center">
                <VoteForm story={story} setStory={setStory} />
                <Flex align="center">
                    <Icon as={FaRegCommentAlt} color="teal.700" />
                    <Text pl={2}>{`${story.comment_count}`}</Text>
                </Flex>
                <IconButton onClick={handleShareClick} isRound={true} icon={<GrShareOption />}/>
            </Flex>
            {shareIconsVisible && <Share title={story.title} url={articleUrl} />}
        </Flex>
    )
}

export default FullStory;