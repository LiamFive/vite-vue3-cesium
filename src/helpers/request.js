import axios from 'axios';
import { message } from 'ant-design-vue';
import showCodeMessage from '@/config/status-code';
import { formatJsonToUrlParams } from '@/utils/format';

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;

// 创建实例
const axiosInstance = axios.create({
  baseURL: BASE_PREFIX,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    }
    message.info(JSON.stringify(response.status));
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      message.error(showCodeMessage(response.status));
      return Promise.reject(response.data);
    }
    message.warning('网络连接异常,请稍后再试!');
    return Promise.reject(error);
  },
);
const service = {
  get: (url, data) => axiosInstance.get(url, { params: data }),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url, data) => axiosInstance.delete(url, data),
  upload: (url, file) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  download: (url, data) => {
    const downloadUrl = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`;
    window.location.href = downloadUrl;
  },
};

export default service;
