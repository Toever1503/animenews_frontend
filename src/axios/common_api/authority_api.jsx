import instance, { auth_bearer } from '../default_api';

const baseUrl = 'authority/';

export const getAuthorities = () => {
    return instance.get(baseUrl, auth_bearer());
}