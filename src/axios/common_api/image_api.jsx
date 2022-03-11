import instance, { auth_bearer } from '../default_api';

const baseUrl = 'image/';

export const getImages = (q, date, page) => {
    return instance.get(baseUrl + '?q=' + q + '&date=' + date + '&page=' + page + '&sort=lastCreated,desc');
}

export const getImageDates = () => {
    return instance.get(baseUrl + 'date');
}

export const addImage = (body) => {
    return instance.post(baseUrl, body, auth_bearer);
}

export const updateImage = (body) => {
    return instance.patch(baseUrl + '/' + body.imageName, body, auth_bearer);
}

export const deleteImageByName = (name) => {
    return instance.delete(baseUrl + name);
}


export const searchImages = (q, page) => {
    return instance.get(baseUrl + 'search?q=' + q + '&page=' + page + '&sort=lastCreated,desc');
}