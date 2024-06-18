import { useParams } from "react-router-dom";
import PreviewCard from "./PreviewCard";
import { fetchAllArticles } from "../utils/api"
import { useState, useEffect } from "react";

const Topic = () => {
    const [stories, setStories] = useState([])
    const { topic_slug } = useParams();

    useEffect(() => {
        fetchAllArticles(topic_slug).then(() => {
    
        })
    }, [])

    return (
        <section>
            <PreviewCard/>
        </section>
    )
}

export default Topic;