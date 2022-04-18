import instance from '../default_api';

const baseUrl = 'user_account/';

export const login = (body) => {
    return instance.post(baseUrl + 'login', body);
}

export const register = (body) => {
    return instance.post(baseUrl + 'register', body);
}
export const checkUser = (role) => {
    return instance.get(baseUrl + 'checkToken' + (role !== '' ? `?role=${role}` : '') + role);
}