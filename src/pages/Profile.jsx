import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import { getUserbyUsername, fetchAllArticles } from "../utils/api"
import PreviewCard from "../components/cards/PreviewCard";
import InternalLink from "../components/InternalLink";

const Profile = () => {
    const { loggedInUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});
    const [usersStories, setUsersStories] = useState([])

    useEffect(() => {
        if (loggedInUser) {
        getUserbyUsername(loggedInUser.username).then((data) => {
            const { user } = data
            setUserDetails(user)
            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
            setDataFetchFailed(true);
        });
    }
    }, [loggedInUser])

    useEffect(() => {
        if (loggedInUser) {
            fetchAllArticles(userDetails.author).then((data) => {
                const { articles } = data;
                setUsersStories(articles);
            })
        }
    }, [loggedInUser])

    return (
        <Flex mt={4} justify="center" direction="column" align="center" >
            {isLoading && <Spinner/>}
            {!isLoading &&
                <>
                <Heading fontSize="3xl">{userDetails.name}</Heading>
                <Image m={4} src={userDetails.avatar_url} alt={`${userDetails.name}'s avatar`} /> 
                <Heading mt={4} as="h3" fontSize="2xl" >Your Posts</Heading>
                {usersStories && 
                    usersStories.map((story) => (
                        <PreviewCard key={story.article_id} article={story} />
                    ))
                }
                {!usersStories && 
                    <>
                    <Text m={2} >You haven't written anything yet.</Text>
                    <InternalLink text="Post your first story!" ariaLabel="Post your first story" to={"/stories/post-story"}  />
                    </>
                }
                </>
    
            }
        </Flex>
    )
}

export default Profile;