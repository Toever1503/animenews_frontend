import instance, { auth_bearer } from '../default_api';

const baseUrl = 'tag/';

export async const getTag = (id) =>{
    return await instance.get(baseUrl+id);
}

export async const getTags = (page) =>{
    return await instance.get(baseUrl+page);
}

export async const addTag = (body) =>{
    return await instance.post(baseUrl, body, auth_bearer);
}

export async const updateTag = (body) =>{
    return await instance.patch(baseUrl, body, auth_bearer);
}

export async const deleteTag = (id) =>{
    return await instance.delete(baseUrl+id);
}

export async const searchTags = (query, page) =>{
    // return await instance.get(id);
    return null;
}