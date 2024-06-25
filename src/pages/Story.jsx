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
import DeleteConfirmation from "../components/DeleteConfirmation";
import FullStory from "../components/cards/FullStory";

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
                {storyDeleted && <DeleteConfirmation/>}
                {isLoading && <Spinner />}
                {!isLoading && !storyDeleted &&
                    <>
                        <FullStory story={story} setStory={setStory} loggedInUser={loggedInUser} onDelete={onDelete} isDeleting={isDeleting} errors={errors} handleShareClick={handleShareClick} shareIconsVisible={shareIconsVisible} articleUrl={articleUrl} />
                        <CommentThread article_id={article_id}/> 
                    </>
                }
            </Flex>
        </>
    );
};

export default Story;
