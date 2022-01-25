import instance, { auth_bearer } from '../default_api';

const baseUrl = 'option/';

export async const getOptions = (optionName) => {
    return await instance.get(baseUrl + optionName);
}

export async const addOption = (body) => {
    return await instance.post(baseUrl, body, auth_bearer);
}

export async const updateOption = (body) => {
    return await instance.patch(baseUrl + body.id, body, auth_bearer);
}

export async const deleteOption = (id) => {
    return await instance.delete(baseUrl + id);
}
