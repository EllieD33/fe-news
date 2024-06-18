import axios from 'axios';

const newsApi = axios.create ({ baseURL: "https://news-site-qstq.onrender.com/api"})

export const fetchAllTopics = () => {
    return newsApi.get("/topics").then(({ data }) => data);
}

export const fetchAllArticles = (topic_slug) => {
    return newsApi.get("/articles", { topic_slug }).then(({ data }) => data);
}

export const fetchArticleById = (article_id) => {
    return newsApi.get(`/articles/${article_id}`).then(({ data }) => data);
}

export const fetchArticleComments = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => data);
}

export const updateArticleVotes = (article_id, votes) => {
    return newsApi.patch(`/articles/${article_id}`, {inc_votes: votes}).then(({ data }) => data);
}

export const addComment = (article_id, username, body) => {
    return newsApi.post(`/articles/${article_id}/comments`, { username: username, body: body}).then(({ data }) => data);
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`)
}