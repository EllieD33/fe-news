import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllArticles } from "../utils/api";
import TopicFilter from "./TopicFilter";
import PreviewCard from "./PreviewCard";

const Topic = () => {
    const [stories, setStories] = useState([])
    const { topic_slug } = useParams();

    useEffect(() => {
        fetchAllArticles(topic_slug).then(() => {
    
        })
    }, [])

    return (
        <section>
            <TopicFilter/>
            <PreviewCard/>
        </section>
    )
}

export default Topic;