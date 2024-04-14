import axios from 'axios';

axios.defaults.baseURL =
    'https://mixing-potions-drf-api-0a8cbdf11dd2.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
