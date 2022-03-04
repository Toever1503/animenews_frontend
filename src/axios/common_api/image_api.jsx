import instance, { auth_bearer } from '../default_api';

const baseUrl = 'image/';

export const getImages = (page) => {
    return instance.get(baseUrl + '?page=' + page + '&sort=lastCreated,desc');
}

export const addImage = (body) => {
    return instance.post(baseUrl, body, auth_bearer);
}

export const updateImage = (body) => {
    return instance.patch(baseUrl + '/' + body.imageName, body, auth_bearer);
}

export const deleteImageByName = (name) => {
    return instance.delete(baseUrl + name);
}

export const searchImages = (query, page) => {
    // return await instance.get(id);
    return null;
}