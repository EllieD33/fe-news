import { Flex, Heading, Text } from "@chakra-ui/react"
import PreviewCard from "../cards/PreviewCard"

const FeaturedStories = ({ title, subtitle, stories }) => {
    return (
        <Flex m={4} as="section" direction="column" align="center">
            <Heading as="h3" fontSize="2xl" >{title}</Heading>
            <Text>{subtitle}</Text>
            <Flex direction="column" align="center">
                {stories.map((article) => (
                        <PreviewCard key={article.article_id} article={article} />
                    ))
                }
            </Flex>
        </Flex>
    )
}

export default FeaturedStories;