import instance, { auth_bearer } from '../default_api';

const baseUrl = 'option/';

export  const getOptions = (optionName) => {
    return  instance.get(baseUrl + optionName);
}

export  const addOption = (body) => {
    return  instance.post(baseUrl, body, auth_bearer());
}

export  const updateOption = (body) => {
    return  instance.patch(baseUrl + body.id, body, auth_bearer());
}

export  const deleteOption = (id) => {
    return  instance.delete(baseUrl + id);
}
