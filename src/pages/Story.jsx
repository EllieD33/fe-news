import { useEffect, useState, useContext } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import {
    Heading,
    Flex,
    Text,
    Box,
    Icon,
    Link as ChakraLink,
    Spinner,
    IconButton,
    Image,
    SkipNavContent
} from "@chakra-ui/react";
import { FaRegCommentAlt } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { fetchArticleById, deleteArticle } from "../utils/api";
import { formatDate, capitaliseFirstLetter } from "../utils/helpers";
import UserContext from "../contexts/UserContext";
import VoteForm from "../components/forms/VoteForm";
import PageNotFound from "../components/PageNotFound";
import Share from "../components/Share";
import DeleteButton from "../components/DeleteButton";
import CommentThread from "../components/CommentThread";

const Story = () => {
    const { loggedInUser } = useContext(UserContext);
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [story, setStory] = useState({});
    const [isDeleting, setIsDeleting] = useState(false);
    const [storyDeleted, setStoryDeleted] = useState(false);
    const [shareIconsVisible, setShareIconsVisible] = useState(false)
    const [dataFetchFailed, setDataFetchFailed] = useState(false);
    const { article_id } = useParams();

    useEffect(() => {
        fetchArticleById(article_id)
            .then(({ article }) => {
                setStory(article);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setDataFetchFailed(true);
            });
    }, []);

    const handleDeleteStoryClick = () => {
            setIsDeleting(true);
        deleteArticle(article_id).then(() => {
            setStoryDeleted(true);
            setIsDeleting(false);
            setErrors({});
        }).catch((error) => {
            setErrors({ deleteFailed: "Failed to delete story"});
            setIsDeleting(false);
        })
    }

    const onDelete = () => {
        handleDeleteStoryClick();
    };

    const handleShareClick = () => {
        setShareIconsVisible(!shareIconsVisible);
    }

    if (dataFetchFailed) {
        return <PageNotFound />;
    }

    const articleUrl = `${window.location.origin}/article/${article_id}`;

    return (
        <>
            <SkipNavContent />
            <Flex m={4} as="main" direction="column" align="center">
                {storyDeleted && 
                    <Flex direction="column">
                        <Heading fontSize="2xl" m={4} textAlign="center" >Story successfully deleted</Heading>
                        <Image boxSize="md" src="https://images.pexels.com/photos/850216/pexels-photo-850216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="bin with balled up paper inside" />
                    </Flex>
                }
                {isLoading && <Spinner />}
                {!isLoading && !storyDeleted &&
                    <>
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
                        </Flex>
                        {shareIconsVisible && <Share title={story.title} url={articleUrl} />}
                        <CommentThread article_id={article_id}/> 
                    </>
                }
            </Flex>
        </>
    );
};

export default Story;
