import instance, { auth_bearer } from '../default_api';

const baseUrl = 'term/';

export const getTerm = (slug) => {
    return instance.get(baseUrl + slug);
}

export const getTerms = (page, size) => {
    return instance.get(baseUrl + '?page=' + page + '&size=' + size+'&sort=id,desc');
}

export const addTerm = (body) => {
    return instance.post(baseUrl, body, auth_bearer());
}

export const updateTerm = (body) => {
    return instance.patch(baseUrl+body.id, body, auth_bearer());
}

export const deleteTerm = (id) => {
    return instance.delete(baseUrl + id);
}

export const deleteTerms = (ids) => {
    return instance.post(baseUrl + 'delete/batch', ids, auth_bearer());
}

export const searchTerms = (query, page) => {
    // return  instance.get(id);
    return null;
}