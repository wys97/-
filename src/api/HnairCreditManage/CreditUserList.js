/* 贷款业务管理-授信用户列表相关接口 */
import axiosService from "../axios";

/**
 * 授信状态
 */
export async function getLimitStatus() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listLimitStatusEnum",
    method: "post"
  });
}

/**
 * 授信用户列表-列表
 */
export async function creditUserList({
  customerId,
  customerName,
  phone,
  identityNo,
  creditLimitStart,
  creditLimitEnd,
  cashCreditCimitStart,
  cashCreditCimitEnd,
  limitStatus,
  page,
  limit
}) {
  const params = {
    customerId,
    customerName,
    phone,
    identityNo,
    creditLimitStart,
    creditLimitEnd,
    cashCreditCimitStart,
    cashCreditCimitEnd,
    limitStatus,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listCreditRecord",
    method: "post",
    data: params
  });
}

/**
 * 授信用户列表-导出
 */
export async function exportExcel({
  customerId,
  customerName,
  phone,
  identityNo,
  creditLimitStart,
  creditLimitEnd,
  cashCreditCimitStart,
  cashCreditCimitEnd,
  limitStatus,
  page,
  limit
}) {
  const params = {
    customerId,
    customerName,
    phone,
    identityNo,
    creditLimitStart,
    creditLimitEnd,
    cashCreditCimitStart,
    cashCreditCimitEnd,
    limitStatus,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/finace-settle/exportCreditCustomer",
    method: "post",
    data: params,
    responseType: "blob"
  });
}
/**
 * 额度调整开关- 合作下拉列表
 */
export async function partnerInfo() {
  return axiosService({
    url: "/admin-api/common/partner-info",
    method: "get",
  });
}

/**
 * 额度调整开关- 获取逾期自动调整额度 开关的状态
 */
export async function switchBtnState(value) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/overdue-auto-change-status/"+value,
    method: "POST",
  });
}
/**
 * 额度调整开关- 确定按钮
 */
export async function preserveState(selectValue,checked) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/overdue-auto-change/"+selectValue+'/'+checked,
    method: "POST",
  });
}


/**
 *  列表操作-额度调整- 信息查询
 */
export async function customerCreditLimit(customerId) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/limit/"+customerId,
    method: "get",
  });
}
/**
 *  列表操作-额度调整- 保存
 */
export async function saveModifiedAmount(customerId,limitList) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/manual-limit-change",
    method: "post",
    data:{
      customerId,
      limitChangeList:limitList
    }
  });
}

export default {
  creditUserList,
  getLimitStatus,
  exportExcel,
  partnerInfo,
  switchBtnState,
  preserveState,
  customerCreditLimit,
  saveModifiedAmount
};
