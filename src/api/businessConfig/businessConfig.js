
import axiosService from "../axios";
/* 支付业务配置列表 */
export async function getPage() {
    return axiosService({
      url: '/admin-api-hnair/business-router/list',
      method: 'get'
    });
  }
/* 支付业务配置下拉 */
export async function channel() {
    return axiosService({
      url: '/admin-api/common/router-channel?status=ENABLED',
      method: 'get'
    });
  }
/* 支付业务配置保存 */
export async function preserveData(data) {
    return axiosService({
      url: '/admin-api-hnair/business-router/update',
      method: 'post',
      data
    });
  }



export default {
    getPage,
    channel,
    preserveData
}