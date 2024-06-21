import axios from 'axios';

const newsApi = axios.create ({ baseURL: "https://news-site-qstq.onrender.com/api"})

export const fetchAllTopics = () => {
    return newsApi.get("/topics").then(({ data }) => data);
}

export const addTopic = (slug, description) => {
    return newsApi.post("/topics", { slug: slug, description: description}).then(({ data }) => data)
    .catch(error => {
        throw error;
    });
}

export const fetchAllArticles = (slug = '', sortBy = "", sortOrder = "", limit = null, author = '' ) => {
    return newsApi.get("/articles", { params: { topic: slug, sort_by: sortBy, order: sortOrder, limit: limit, author: author }}).then(({ data }) => data)
    .catch(error => {
        throw error;
    });
}

export const fetchArticleById = (article_id) => {
    return newsApi.get(`/articles/${article_id}`).then(({ data }) => data).catch(
        error => {
            throw error;
        }
    );
}

export const fetchArticleComments = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => data)
    .catch(error => {
        throw error;
    });
}

export const updateArticleVotes = (article_id, votes) => {
    return newsApi.patch(`/articles/${article_id}`, {inc_votes: votes}).then(({ data }) => data)
    .catch(error => {
        throw error;
    });
}

export const addComment = (article_id, username, body) => {
    return newsApi.post(`/articles/${article_id}/comments`, { username: username, body: body}).then(({ data }) => data)
    .catch(error => {
        throw error;
    });
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`)
    .catch(error => {
        throw error;
    });
}

export const postStory = (author, title, body, topic, article_img_url) => {
    return newsApi.post("/articles", {author, title, body, topic, article_img_url}).then(({ data }) => data)
    .catch(error => {
        throw error;
    });
}

export const getAllUsers = () => {
    return newsApi.get("/users").then(({ data }) => data)
    .catch(error => {
        throw error;
    });
}

export const getUserbyUsername = (username) => {
    return newsApi.get(`/users/${username}`).then(({ data }) => data)
    .catch(error => {
        throw error;
    });
}