import instance, { auth_bearer } from '../default_api';

const baseUrl = 'post/';

export const getPost = (id) => {
    return instance.get(baseUrl + 'id/' + id);
}
export const getPostByName = (name, date) => {
    return instance.get(baseUrl + `${name}/${date}`);
}
export const getPosts = (termId, page, size) => {
    return instance.get(baseUrl + '?category=' + termId + '&page=' + page + '&size=' + size);
}
export const getPostCarousels = (termIds) => {
    return instance.get(baseUrl +'homeCarousel?termIds=' + termIds);
}

export const addPost = (body) => {
    return instance.post(baseUrl, body, auth_bearer);
}

export const addPostElasticsearch = (body) => {
    return instance.post(baseUrl + 'elasticsearch', body, auth_bearer);
}

export const addPostTags = (body) => {
    return instance.post(baseUrl + 'PostTags', body, auth_bearer);
}

export const addPostTerms = (body) => {
    return instance.post(baseUrl + 'PostTerms', body, auth_bearer);
}

export const addPostMetas = (body) => {
    return instance.post(baseUrl + 'PostMetas', body, auth_bearer);
}

export const updatePost = (body) => {
    return instance.patch(baseUrl + body.id, body, auth_bearer);
}

export const deletePost = (id) => {
    return instance.delete(baseUrl + id);
}

export const deletePosts = (ids) => {
    return instance.post(baseUrl + 'delete/batch', ids, auth_bearer);
}

export const searchPosts = (query, page) => {
    // return  instance.get(id);
    return null;
}

