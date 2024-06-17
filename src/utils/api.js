import axios from 'axios';

const newsApi = axios.create ({ baseURL: "https://news-site-qstq.onrender.com/api"})

export const fetchAllArticles = () => {
    return newsApi.get("/articles").then(({ data }) => data);
}

export const fetchArticleById = ({ article_id }) => {
    return newsApi.get("/articles/:article_id").then(({ data }) => data);
}