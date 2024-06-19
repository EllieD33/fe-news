import { Card, Heading, Image, Text, Flex, Link as ChakraLink, Button, Icon } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { capitaliseFirstLetter, formatDate } from '../utils/helpers';

const PreviewCard = ({ article }) => {
    const article_id = article.article_id
    return (
        <Card as="article" minW="320px" tabIndex={0} m={4} p={2} transition="all 0.2s" _hover={{ transform: "translateY(-4px)", shadow: "lg", color: "teal" }} >
            <Heading fontSize="lg" as="h3">{article.title}</Heading>
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
                        <Text>Votes: <span>{article.votes}</span></Text>
                        <Text>Comments: <span>{article.comment_count}</span></Text>
                    </Flex>
                </Flex>
                    <Flex alignSelf={{base: "flex-start", md: "flex-end"}} >
                        <ChakraLink
                                as={ReactRouterLink}
                                to={`/stories/${article_id}`}
                                mb={2}
                                alignSelf={{base: "flex-end", md: "flex-start"}}
                            >
                            <Button
                                w="150px"
                                rightIcon={<Icon as={ArrowRightIcon} />}
                                size="sm"
                                colorScheme="teal"
                            >
                                Read story
                            </Button>
                        </ChakraLink>
                    </Flex>
            </Flex>
        </Card>
    )
}

export default PreviewCard;