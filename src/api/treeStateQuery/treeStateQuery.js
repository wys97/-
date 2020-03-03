
import axiosService from "../axios";
/* 树形状态查询相关接口 */
export async function getPage() {
    return axiosService({
      url: '/admin-api-hnair/refund-detail/transformationToRefundPay/enumeration',
      method: 'post'
    });
  }

/* 下载统计 */
export async function getPageDownload() {
    return axiosService({
      url: '/admin-api-hnair/refund-detail/transformationToRefundPay/appDownload',
      method: 'post'
    });
  }
  

export default {
    getPage,
    getPageDownload
}