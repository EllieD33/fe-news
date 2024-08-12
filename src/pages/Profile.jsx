import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Heading, Image, Spinner, Text, SkipNavContent, Link as ChakraLink } from "@chakra-ui/react";
import { getUserByUsername, fetchAllArticles } from "../utils/api"
import PreviewCard from "../components/cards/PreviewCard";
import InternalLink from "../components/InternalLink";

const Profile = () => {
    const { loggedInUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});
    const [usersStories, setUsersStories] = useState([])

    useEffect(() => {
        if (loggedInUser) {
        getUserByUsername(loggedInUser).then((data) => {
            const { user } = data
            setUserDetails(user)
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false);
        });
    }
    }, [loggedInUser])

    useEffect(() => {
        if (loggedInUser) {
            fetchAllArticles().then((data) => {
                const filteredArticles = data.articles.filter(article => article.author === loggedInUser);
                setUsersStories(filteredArticles);
            })
        }
    }, [loggedInUser])

    return (
        <>
            <SkipNavContent />
            <Flex as="main" mt={4} justify="center" direction="column" align="center" >
                {loggedInUser && isLoading && <Spinner/>}
                {!loggedInUser && <Text mt={10} >You are not logged in. Please <ChakraLink as={ReactRouterLink} to="/login">log in</ChakraLink> to view you profile.</Text>}
                {!isLoading &&
                    <>
                    <Heading fontSize="3xl">{userDetails.name}</Heading>
                    <Image m={4} maxH="200px" maxW="200px" src={userDetails.avatar_url} alt={`${userDetails.name}'s avatar`} /> 
                    <Heading mt={4} as="h3" fontSize="2xl" >Your Posts</Heading>
                    <Flex wrap="wrap" justify="center" >
                        {usersStories &&
                            usersStories.map((story) => (
                                <PreviewCard key={story.article_id} article={story} />
                            ))
                        }
                    </Flex>
                    {usersStories.length === 0 && 
                        <>
                        <Text m={2} >You haven't written anything yet.</Text>
                        <InternalLink text="Post your first story!" ariaLabel="Post your first story" to={"/stories/post-story"}  />
                        </>
                    }
                    </>
                }
            </Flex>
        </>
    )
}

export default Profile;