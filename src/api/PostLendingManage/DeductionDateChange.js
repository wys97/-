/* 扣款日变更相关接口 */
import axiosService from "../axios";

/*
 * 生效状态查询
 */
export async function queryChangeStatus() {
  return axiosService({
    url: '/admin-api/change-repay-day/change-status',
    method: 'post'
  })
}

/*
 * 扣款日变更查询
 */
export async function queryDateList({dueId, customerName, identityNo, phone, partnerName, productName, changeStatus, page, limit}) {
  const params = {
    dueId,
    customerName,
    identityNo,
    phone,
    partnerName,
    productName,
    changeStatus,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api/change-repay-day/list',
    method: 'post',
    data: params,
  });
}

/*
 * 扣款日变更详情查询
 */
export async function queryDateDetail(id) {
  return axiosService({
    url: '/admin-api/change-repay-day/detail/' + id,
    method: 'post'
  });
}

export default {
  queryChangeStatus,
  queryDateList,
  queryDateDetail
}
