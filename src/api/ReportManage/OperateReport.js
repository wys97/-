/* 运营报表相关接口 */
import axiosService from "../axios";

/*
 * 运营概括
 */
export async function operateInfo() {
  return axiosService({
    url: '/admin-api/operation-report/all',
    method: 'post'
  });
}

export default {
  operateInfo,
 
}
