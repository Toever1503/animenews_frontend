import instance from '../default_api';

const baseUrl = 'account/';

export async const login = (body) => {
    return await instance.post(baseUrl + 'login', body);
}

export async const register = (body) => {
    return await instance.post(baseUrl + 'register', body);
}