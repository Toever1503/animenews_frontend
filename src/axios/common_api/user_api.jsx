import instance, { auth_bearer } from '../default_api';

const baseUrl = 'user/';

export async const getUser = (id) =>{
    return await instance.get(baseUrl+id);
}

export async const getUsers = (page) =>{
    return await instance.get(baseUrl+page);
}

export async const addUser = (body) =>{
    return await instance.post(baseUrl, body, auth_bearer);
}

export async const updateUser = (body) =>{
    return await instance.patch(baseUrl, body, auth_bearer);
}

export async const deleteUser = (id) =>{
    return await instance.delete(baseUrl+id);
}

export async const searchUsers = (query, page) =>{
    // return await instance.get(id);
    return null;
}