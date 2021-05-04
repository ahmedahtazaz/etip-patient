import { base_url } from './environment';
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: base_url,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use((config) => {
  config.headers["organization"] = "eTip-german";
  return config;
})

AxiosInstance.interceptors.response.use(
  response => {
    return {
      success: response
    };
  },
  error => {
    if (!error.response) {
      return {
        error: {
          status: -1,
          message: "Network Error"
        }
      }
    } else {
      return {
        error: {
          status: error.response.status,
          message: error.response.data.message
        }
      }
    }
  },
);

export default AxiosInstance;
