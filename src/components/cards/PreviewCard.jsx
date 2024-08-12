import { Card, Heading, Image, Text, Flex, Link as ChakraLink, Icon, Tooltip } from "@chakra-ui/react"
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
        <Card as="article" w={[300, 400, 500]} boxShadow="0px 6px 8px 0px rgba(40, 94, 97, 1)" display="flex" justify="space-around" minW="300px" minH="192px" m={4} transition="all 0.2s" _hover={{ transform: "translateY(-4px)", boxShadow: "0px 10px 15px 0px rgba(40, 94, 97, 1)" }} >
            <Flex direction={{ base: "column", md: "row" }}>
                <Image src={article_img_url} alt="image related to article" borderRadius={{ base: "5px 5px 0 0", md: "5px 0 0 5px" }} objectFit='cover' w={{ base: "300px", md: "200px" }} h={{ base: "200px", md: "200px" }} />
                <Flex w="100%" direction="column" justifyContent="center" ml={2} px={3} pt={1} >
                <Tooltip label={title} hasArrow placement="top">
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                        as="h4"
                        mb={1}
                        maxW="250px"
                        overflow="hidden"
                        whiteSpace="normal"
                        display="-webkit-box"
                        WebkitBoxOrient="vertical"
                        WebkitLineClamp={2}
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            lineClamp: 2
                        }}
                    >{title}</Text>
                </Tooltip>
                    <Flex alignItems="center" justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                        <Flex w="100%" align="center">
                            <Flex w="100%" direction="column" >
                                <Flex >
                                    <Text mr={2} >In: </Text>
                                    <ChakraLink as={ReactRouterLink} to={`/topics/${topic}`} >{capitaliseFirstLetter(topic)}</ChakraLink>
                                </Flex>
                                <Text>Authored by: {author}</Text>
                                <Text>On: {formatDate(created_at)}</Text>
                                <Flex w="100%" justify="space-between" pb={2}>
                                    <Flex direction="column">
                                        <Flex>
                                            <Icon as={getVoteIcon(votes)} boxSize={5} />
                                            <Text pl={1} >{votes}</Text>
                                        </Flex>
                                        <Flex align="center">
                                            <Icon as={FaRegCommentAlt} />
                                            <Text pl={2} >{`${comment_count}`}</Text>
                                        </Flex>
                                    </Flex>
                                    <Flex pt={1} alignSelf={{base: "flex-start", md: "flex-end"}}  >
                                        <InternalLink to={`/stories/${article_id}`} ariaLabel="Read story" text="Read story" alignSelf={{ base: "flex-start", md: "flex-end" }} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export default PreviewCard;