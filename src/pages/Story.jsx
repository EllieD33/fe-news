import { useEffect, useState } from "react";
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
    IconButton
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FaRegCommentAlt } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { fetchArticleById, fetchArticleComments } from "../utils/api";
import { formatDate, capitaliseFirstLetter } from "../utils/helpers";
import CommentCard from "../components/cards/CommentCard";
import VoteForm from "../components/forms/VoteForm";
import NewCommentForm from "../components/forms/NewCommentForm";
import PageNotFound from "../components/PageNotFound";
import Share from "../components/Share";

const Story = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [commentsAreLoading, setCommentsAreLoading] = useState(true);
    const [story, setStory] = useState({});
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
        });
    }, [setComments]);

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
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Flex
                        as="article"
                        direction="column"
                        m={4}
                        maxW="70%"
                        alignItems="center"
                    >
                        <Heading fontSize="3xl" textAlign="center">
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
            )}
        </Flex>
    );
};

export default Story;
