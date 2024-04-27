import axiosInstance from "axios";
import config from "./config";

const getToken = async () => {
  const response = await axiosInstance.post(config.api.authUrl, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(config.api.clientId + ':' + config.api.clientSecret),
    },
    params: {
      grant_type: 'client_credentials',
    },
  });

  const accessToken = response.data.access_token;
  localStorage.setItem('accessToken', accessToken);

  return accessToken;
};

const axios = axiosInstance.create({
  baseURL: config.api.baseUrl
});

/*
  Make access token automatically add to 
  every request api
*/
axios.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    accessToken = await getToken();
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default axios;
