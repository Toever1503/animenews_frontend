import axios from "axios";
import { getCookie } from "../site/site_admin/AdminLayout";
const axiosConfig = {
  baseURL: 'http://localhost:8081/api',
  timeout: 5000,
  withCredentials: true,
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
      'Authorization': getCookie('userLogged')
    }
  };
}

