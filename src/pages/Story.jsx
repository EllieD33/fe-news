import { useEffect, useState, useContext } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import {
    Heading,
    Flex,
    Text,
    Box,
    Button,
    Icon,
    Link as ChakraLink,
    Spinner,
    IconButton,
    Image
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaRegCommentAlt } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { fetchArticleById, fetchArticleComments, deleteArticle } from "../utils/api";
import { formatDate, capitaliseFirstLetter } from "../utils/helpers";
import UserContext from "../contexts/UserContext";
import CommentCard from "../components/cards/CommentCard";
import VoteForm from "../components/forms/VoteForm";
import NewCommentForm from "../components/forms/NewCommentForm";
import PageNotFound from "../components/PageNotFound";
import Share from "../components/Share";
import DeleteButton from "../components/DeleteButton";

const Story = () => {
    const { loggedInUser } = useContext(UserContext);
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [commentsAreLoading, setCommentsAreLoading] = useState(true);
    const [story, setStory] = useState({});
    const [storyDeleted, setStoryDeleted] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentFormIsVisible, setCommentFormIsVisible] = useState(false);
    const [showCommentFormButton, setShowCommentFormButton] = useState(true);
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

    useEffect(() => {
        fetchArticleComments(article_id).then(({ comments }) => {
            setComments(comments);
            setCommentsAreLoading(false);
            setErrors({})
        }).catch((error) => {
            setErrors({ commentFetchFailed: "Failed to load comments"});
        });
    }, [setComments]);

    const handleDeleteStoryClick = () => {
        deleteArticle(article_id).then(() => {
            setStoryDeleted(true);
            setErrors({})
        }).catch((error) => {
            setErrors({ deleteFailed: "Failed to delete story"});
        })
    }

    const onDelete = () => {
        handleDeleteStoryClick();
    };

    const handleShareClick = () => {
        setShareIconsVisible(!shareIconsVisible);
    }

    const handleAddCommentClick = () => {
        setCommentFormIsVisible(true);
        setShowCommentFormButton(false);
    };

    if (dataFetchFailed) {
        return <PageNotFound />;
    }

    const articleUrl = `${window.location.origin}/article/${article_id}`;

    return (
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
                        {story.author === loggedInUser.username && 
                            <Flex>
                                <DeleteButton text={story} onDelete={onDelete} />
                                {errors.deleteFailed && <Text fontSize="sm" color="red" >{errors.deleteFailed}</Text> }
                                <IconButton onClick={handleDeleteStoryClick} aria-label="delete story" m={2} colorScheme="teal" variant="outline" icon={<DeleteIcon/>} />
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
                    <Flex
                        as="section"
                        direction="column"
                        align="center"
                        w="50%"
                        mt={2}
                    >
                        <Heading as="h3" fontSize="lg">
                            Comments
                        </Heading>
                        {showCommentFormButton && (
                            <Button
                                w="150px"
                                leftIcon={<Icon as={AddIcon} />}
                                size="sm"
                                colorScheme="teal"
                                bg="teal.700"
                                _hover={{ bg: 'teal.500' }}
                                sx={{ svg: { color: "whiteAlpha.900" } }}
                                onClick={handleAddCommentClick}
                            >
                                Add comment
                            </Button>
                        )}
                        {commentFormIsVisible && (
                            <NewCommentForm
                                setComments={setComments}
                                comments={comments}
                                article_id={story.article_id}
                                setCommentFormIsVisible={
                                    setCommentFormIsVisible
                                }
                                setShowCommentFormButton={setShowCommentFormButton}
                            />
                        )}
                        {commentsAreLoading && <Text>Loading comments...</Text>}
                        {errors.commentFetchFailed && <Text>{commentFetchFailed}</Text>}
                        {comments.length === 0 ? (
                            <Text my={2}>No comments yet...</Text>
                        ) : (
                            comments.map((comment) => (
                                <CommentCard
                                    key={comment.comment_id}
                                    comment={comment}
                                    setComments={setComments}
                                    comments={comments}
                                />
                            ))
                        )}
                    </Flex>
                </>
            }
        </Flex>
    );
};

export default Story;
