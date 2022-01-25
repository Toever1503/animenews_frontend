import instance, { auth_bearer } from '../default_api';

const baseUrl = 'term/';

export async const getTerm = (id) =>{
    return await instance.get(baseUrl+id);
}

export async const getTerms = (page) =>{
    return await instance.get(baseUrl+page);
}

export async const addTerm = (body) =>{
    return await instance.post(baseUrl, body, auth_bearer);
}

export async const updateTerm = (body) =>{
    return await instance.patch(baseUrl, body, auth_bearer);
}

export async const deleteTerm = (id) =>{
    return await instance.delete(baseUrl+id);
}

export async const searchTerms = (query, page) =>{
    // return await instance.get(id);
    return null;
}