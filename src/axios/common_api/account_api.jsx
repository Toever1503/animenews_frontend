import { getCookie } from '../../site/site_admin/AdminLayout';
import instance, { auth_bearer } from '../default_api';
const baseUrl = 'user_account/';

export const login = (body) => {
    return instance.post(baseUrl + 'login', body);
}

export const register = (body) => {
    return instance.post(baseUrl + 'register', body);
}

export const activeAccount = (account, code) => {
    return instance.get(baseUrl + 'active?account=' + account + '&code=' + code);
}

export const checkUser = (role) => {
    return instance.get(baseUrl + 'checkToken' + (role !== '' ? `?role=${role}` : ''), auth_bearer());
}