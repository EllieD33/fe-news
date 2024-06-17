import axios from 'axios';

const newsApi = axios.create ({ baseURL: "https://news-site-qstq.onrender.com/api"})

export const fetchAllArticles = () => {
    return newsApi.get("/articles").then(({ data }) => data);
}