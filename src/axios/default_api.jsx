import axios from "axios";

const axiosConfig = {
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
  // headers: {'application/content-type': 'foobar'}
};

const instance = axios.create(axiosConfig);
export default instance;

// instance.interceptors.request.use(function (config) {
//   config.headers.common = { ...config.headers.common, "X-CSRF-TOKEN": () => store.state.csrf }
//   return config;
// }, function (error) {
//   // Do something with request error
//   logger.error(error);
//   return Promise.reject(error);
// });

export const auth_bearer = () => {
  return {
    headers: {
      'Authorization': `Bearer`
    }
  };
}

