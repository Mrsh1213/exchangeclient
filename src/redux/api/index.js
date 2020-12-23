import axios from 'axios';

const baseUrl = "https://www.omdbapi.com/?apikey=ffd0c3a5";

export const apiCall = (url, method, data, headers) => axios({
    method,
    url: baseUrl + url,
    data,
    headers
});
