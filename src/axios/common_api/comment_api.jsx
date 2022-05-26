import instance, { auth_bearer } from '../default_api';

const baseUrl = 'comments/';

export const getComment = (id) => {
    return instance.get(baseUrl + id);
}

export const getComments = (page, size) => {
    return instance.get(baseUrl + '?page=' + page + '&size=' + size);
}

export const getCommentsByPost = (postId, page, size) => {
    return instance.get(baseUrl + '?post=' + postId + '&page=' + page + '&size=' + size);
}

export const addComment = (body) => {
    return instance.post(baseUrl, body, auth_bearer());
}

export const updateComment = (body) => {
    return instance.patch(baseUrl + body.id, body, auth_bearer());
}

export const deleteComment = (id) => {
    return instance.delete(baseUrl + id, auth_bearer());
}

export const searchComments = (query, page) => {
    // return await instance.get(baseUrl+id);
    return null;
}