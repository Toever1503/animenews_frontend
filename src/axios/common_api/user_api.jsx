import instance, { auth_bearer } from '../default_api';

const baseUrl = 'user/';

export const getUser = (id) => {
    return instance.get(baseUrl + id);
}

export const getUsers = (page, size) => {
    return instance.get(baseUrl + '?page=' + page + '&size=' + size+'&sort=id,desc');
}

export const addUser = (body) => {
    return instance.post(baseUrl, body, auth_bearer());
}

export const updateUser = (body) => {
    return instance.patch(baseUrl, body, auth_bearer());
}

export const deleteUser = (id) => {
    return instance.delete(baseUrl + id);
}

export const deleteUsers = (ids) => {
    return instance.post(baseUrl + 'delete/batch', ids, auth_bearer());
}



export const searchUsers = (query, page) => {
    // return  instance.get(id);
    return null;
}