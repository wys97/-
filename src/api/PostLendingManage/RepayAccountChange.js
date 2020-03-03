/* 还款账户变更相关接口 */
import axiosService from "../axios";

/*
 * 账户变更类型查询
 */
export async function queryAccountType() {
  return axiosService({
    url: '/admin-api/change-repay-account/change-account-type',
    method: 'post'
  })
}

/*
 * 扣款日变更查询
 */
export async function queryAccountList({changeId, customerName, identityNo, phone, partnerName, changeAccountType, page, limit}) {
  const params = {
    changeId,
    customerName,
    identityNo,
    phone,
    partnerName,
    changeAccountType,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api/change-repay-account/list',
    method: 'post',
    data: params
  });
}

/*
 * 扣款日变更详情查询
 */
export async function queryAccountDetail(id) {
  return axiosService({
    url: '/admin-api/change-repay-account/detail/' + id,
    method: 'post'
  });
}

export default {
  queryAccountType,
  queryAccountList,
  queryAccountDetail
}
