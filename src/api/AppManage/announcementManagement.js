/* 退票数据导入相关接口 */
import axiosService from "../axios";

/*
 * 溢缴款明细 - 退票类型查询
 */
export async function getPage() {
  return axiosService({
    url: '/admin-api-hnair/refund-detail/transformationToRefundPay/notice',
    method: 'post'
  })
}

export default {
  getPage
}
