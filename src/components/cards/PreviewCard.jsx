import { Card, Heading, Image, Text, Flex, Link as ChakraLink, Icon } from "@chakra-ui/react"
import { FaRegCommentAlt,  } from "react-icons/fa";
import { TiArrowDownOutline, TiArrowUpOutline, TiMinusOutline } from "react-icons/ti";
import { Link as ReactRouterLink } from "react-router-dom";
import { capitaliseFirstLetter, formatDate } from '../../utils/helpers';
import InternalLink from "../InternalLink";

const PreviewCard = ({ article }) => {
    const { article_id, title, article_img_url, topic, author, created_at, votes, comment_count } = article;

    const getVoteIcon = (votes) => {
        if (votes > 0) return TiArrowUpOutline;
        if (votes < 0) return TiArrowDownOutline;
        return TiMinusOutline;
    };

    return (
        <Card as="article" w={[300, 400, 500]} boxShadow="0px 6px 8px 0px rgba(40, 94, 97, 1)" display="flex" direction="column" justify="space-around" minW="300px" minH="192px" m={4} px={3} py={3} transition="all 0.2s" _hover={{ transform: "translateY(-4px)", boxShadow: "0px 10px 15px 0px rgba(40, 94, 97, 1)" }} >
            <Heading fontSize="lg" as="h4" mb={1} >{title}</Heading>
            <Flex alignItems="center" justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                <Flex w="100%" align="center">
                    <Image src={article_img_url} alt="image related to article" borderRadius="5px" objectFit='cover' boxSize="100px" />
                    <Flex ml={2} direction="column" >
                        <Flex>
                            <Text mr={2} >In: </Text>
                            <ChakraLink as={ReactRouterLink} to={`/topics/${topic}`} >{capitaliseFirstLetter(topic)}</ChakraLink>
                        </Flex>
                        <Text>Authored by: {author}</Text>
                        <Text>On: {formatDate(created_at)}</Text>
                        <Flex>
                            <Icon as={getVoteIcon(votes)} boxSize={5} />
                            <Text pl={1} >{votes}</Text>
                        </Flex>
                        <Flex align="center">
                            <Icon as={FaRegCommentAlt} />
                            <Text pl={2} >{`${comment_count}`}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex pt={1} alignSelf={{base: "flex-start", md: "flex-end"}}  >
                    <InternalLink to={`/stories/${article_id}`} ariaLabel="Read story" text="Read story" alignSelf={{ base: "flex-start", md: "flex-end" }} />
                </Flex>
            </Flex>
        </Card>
    )
}

export default PreviewCard;