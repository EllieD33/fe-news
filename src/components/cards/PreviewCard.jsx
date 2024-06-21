import { Card, Heading, Image, Text, Flex, Link as ChakraLink, Button, Icon } from "@chakra-ui/react"
import { FaRegCommentAlt,  } from "react-icons/fa";
import { TiArrowDownOutline, TiArrowUpOutline, TiMinusOutline } from "react-icons/ti";

import { Link as ReactRouterLink } from "react-router-dom";
import { capitaliseFirstLetter, formatDate } from '../../utils/helpers';
import InternalLink from "../InternalLink";

const PreviewCard = ({ article }) => {
    const article_id = article.article_id
    return (
        <Card as="article" w={[300, 400, 500]} minW="300px" m={4} p={2} transition="all 0.2s" _hover={{ transform: "translateY(-4px)", shadow: "lg"}} >
            <Heading fontSize="lg" as="h4">{article.title}</Heading>
            <Flex alignItems="center" justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                <Flex w="100%" align="center">
                    <Image src={article.article_img_url} alt="image related to article" borderRadius="5px" objectFit='cover' boxSize="100px" />
                    <Flex ml={2} direction="column" >
                        <Flex>
                            <Text mr={2} >In: </Text>
                            <ChakraLink as={ReactRouterLink} to={`/topics/${article.topic}`} >{capitaliseFirstLetter(article.topic)}</ChakraLink>
                        </Flex>
                        <Text>Authored by: {article.author}</Text>
                        <Text>On: {formatDate(article.created_at)}</Text>
                        <Flex>
                            {article.votes > 0 && (
                                <Icon as={TiArrowUpOutline} boxSize={5} />
                            )}
                            {article.votes < 0 && (
                                <Icon as={TiArrowDownOutline} boxSize={5} />
                            )}
                            {article.votes === 0 && (
                                <Icon as={TiMinusOutline} boxSize={5} />
                            )}
                                <Text pl={1} >{article.votes}</Text>
                        </Flex>
                        <Flex align="center">
                            <Icon as={FaRegCommentAlt} />
                            <Text pl={2} >{`${article.comment_count}`}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex alignSelf={{base: "flex-start", md: "flex-end"}}  >
                    <InternalLink to={`/stories/${article_id}`} ariaLabel="Read story" text="Read story" alignSelf={{ base: "flex-start", md: "flex-end" }} />
                </Flex>
            </Flex>
        </Card>
    )
}

export default PreviewCard;