import instance, { auth_bearer } from '../default_api';

const baseUrl = 'comment/';

export async const getComment = (id) => {
    return await instance.get(baseUrl + id);
}

export async const getComments = (page) => {
    return await instance.get(baseUrl + page);
}

export async const addComment = (body) => {
    return await instance.post(baseUrl, body, auth_bearer);
}

export async const updateComment = (body) => {
    return await instance.patch(baseUrl + body.id, body, auth_bearer);
}

export async const deleteComment = (id) => {
    return await instance.delete(baseUrl+id, auth_bearer);
}

export async const searchComments = (query, page) => {
    // return await instance.get(baseUrl+id);
    return null;
}