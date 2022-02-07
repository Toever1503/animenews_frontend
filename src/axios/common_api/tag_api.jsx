import instance, { auth_bearer } from '../default_api';

const baseUrl = 'tag/';

export const getTag = (id) => {
    return instance.get(baseUrl + id);
}

export const getTags = (page, size) => {
    return instance.get(baseUrl + '?page=' + page + '&size=' + size);
}

export const addTag = (body) => {
    return instance.post(baseUrl, body, auth_bearer);
}

export const updateTag = (body) => {
    return instance.patch(baseUrl + body.key, body, auth_bearer);
}

export const deleteTag = (id) => {
    return instance.delete(baseUrl + id);
}

export const deleteTags = (ids) => {
    return instance.post(baseUrl + 'delete/batch', ids, auth_bearer);
}

export const searchTags = (query, page) => {
    // return  instance.get(id);
    return null;
}