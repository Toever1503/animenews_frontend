import instance, { auth_bearer } from '../default_api';

const baseUrl = 'post/';

export async const getPost = (id) => {
    return await instance.get(baseUrl + 'id' + id);
}
export async const getPostByGuid = (guid) => {
    return await instance.get(baseUrl + guid);
}
export async const getPosts = (page) => {
    return await instance.get(baseUrl + page);
}

export async const addPost = (body) => {
    return await instance.post(baseUrl, body, auth_bearer);
}

export async const addPostElasticsearch = (body) => {
    return await instance.post(baseUrl + 'elasticsearch', body, auth_bearer);
}

export async const addPostTags = (body) => {
    return await instance.post(baseUrl + 'PostTags', body, auth_bearer);
}

export async const addPostTerms = (body) => {
    return await instance.post(baseUrl + 'PostTerms', body, auth_bearer);
}

export async const addPostMetas = (body) => {
    return await instance.post(baseUrl + 'PostMetas', body, auth_bearer);
}

export async const updatePost = (body) => {
    return await instance.patch(baseUrl + body.id, body, auth_bearer);
}

export async const deletePost = (id) => {
    return await instance.delete(baseUrl + id);
}

export async const searchPosts = (query, page) => {
    // return await instance.get(id);
    return null;
}

