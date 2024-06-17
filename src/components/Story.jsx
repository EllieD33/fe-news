import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/api";

const Story = () => {
    const [story, setStory] = useState({})
    const { article_id } = useParams();

    useEffect(() => {
        console.log('USE EFFECT')
        console.log(article_id, '<<<id in use effect')
        fetchArticleById(article_id).then(({ article }) => {
            console.log(article, 'setting story with')
            setStory(article)
        })
    },[])

    const storyDate = new Date()

    return (
        <article>
            <h3>{story && story.title}</h3>
            <p>By {`${story.author}`}</p>
            <p></p>
            <p>Category: {`${story.topic}`} </p>
            <p>{story.body}</p>
        </article>
    )
}

export default Story;