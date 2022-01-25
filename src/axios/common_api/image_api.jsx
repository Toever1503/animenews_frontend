import instance, { auth_bearer } from '../default_api';

const baseUrl = 'image/';

export async const getImages = (page) =>{
    return await instance.get(baseUrl+page);
}

export async const addImage = (body) =>{
    return await instance.post(baseUrl, body, auth_bearer);
}

export async const deleteImage = (id) =>{
    return await instance.delete(baseUrl+id);
}

export async const searchImages = (query, page) =>{
    // return await instance.get(id);
    return null;
}