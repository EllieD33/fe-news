import { Card, Heading, Image, Text, Flex } from "@chakra-ui/react"

const PreviewCard = ({ article }) => {
    return (
        <Card as="article" tabIndex={0} m={4} p={2} _hover={{
            background: "white",
            color: "teal.500",
          }} >
            <Heading fontSize="lg" as="h3">{article.title}</Heading>
            <Flex alignItems="center">
                <Image src={article.article_img_url} alt="image related to article" borderRadius="5px" objectFit='cover' boxSize="100px" />
                <Flex ml={2} direction="column">
                    <Text>In: {article.topic}</Text>
                    <Text>Authored by: {article.author}</Text>
                    <Text>Votes: <span>{article.votes}</span></Text>
                    <Text>Comments: <span>{article.comment_count}</span></Text>
                </Flex>
            </Flex>
        </Card>
    )
}

export default PreviewCard;