/* 公共接口 */
import axios from "axios";

const axiosService = axios.create();

axiosService.interceptors.response.use(
  (response) => {
    if (response.data.code === '401') {
      window.location.href = '/#/user/login';
    }
    return response;
  }
);

export default axiosService
