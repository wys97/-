/* 催收分案相关接口 */
import axiosService from "../axios";

/*
 * 催收分案列表
 */
export async function distributionList({
  customerName,
  customerPhone,
  customerIdentifyNo,
  productName,
  startTime,
  overdueDayBegin,
  overdueDayEnd,
  overdueTotalAmountBegin,
  overdueTotalAmountEnd,
  currentOperatorName,
  collectionStatus,
  page,
  limit
}) {
  let startTimeBegin	 = "";
  let startTimeEnd	 = "";
  if (startTime && startTime.length > 0) {
    startTime.map((item, index) => {
      if (index) {
        startTimeEnd	 = new Date(item).Format("yyyy-MM-dd");
      } else {
        startTimeBegin = new Date(item).Format("yyyy-MM-dd");
      }
    });
  }
  const params = {
    customerName,
    customerPhone,
    customerIdentifyNo,
    productName,
    overdueDayBegin,
    overdueDayEnd,
    overdueTotalAmountBegin,
    overdueTotalAmountEnd,
    currentOperatorName,
    collectionStatus,
    startTimeBegin,
    startTimeEnd,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api/collection/distribution/list",
    method: "post",
    data: params
  });
}

/*
 * 手动分案角色下拉列表
 */
export async function distributionUserList() {
  return axiosService({
    url: "/admin-api/collection/distribution/user-list",
    method: "post"
  });
}

/*
 * 催收分案角色下拉列表
 */
export async function roleList() {
  return axiosService({
    url: "/admin-api/collection/distribution/role-list",
    method: "post"
  });
}

/*
 * 催收分案-分案配置-加载默认权限
 */
export async function roleDefault() {
  return axiosService({
    url: "/admin-api/collection/distribution/role-default",
    method: "post"
  });
}

/*
 * 催收状态下拉
 */
export async function listCollectionStatusEnum() {
  return axiosService({
    url: "/admin-api/collection/distribution/listCollectionStatusEnum",
    method: "post"
  });
}

/*
 * 手动分案保存
 */
export async function userSave(data) {
  return axiosService({
    url: "/admin-api/collection/distribution/user-save",
    method: "post",
    data
  });
}

/*
 * 催收分案角色配置保存
 */
export async function roleSave(roleId,isAuto) {
  return axiosService({
    url: "/admin-api/collection/distribution/rule-save/"+roleId+'/'+isAuto,
    method: "post",
  });
}

/*
 * 催收分案-催收明细
 */
export async function baseInfo(roleId) {
  return axiosService({
    url: "/admin-api/collection/distribution/detail/base-info/"+roleId,
    method: "post",
  });
}

/*
 * 催收分案-当前逾期借据
 */
export async function overdueLoanDue(customerId) {
  return axiosService({
    url: "/admin-api/collection/distribution/detail/overdue-loan-due/"+customerId,
    method: "post",
  });
}

/*
 * 催收分案-催收记录
 */
export async function collectionRecord(data) {
  return axiosService({
    url: "/admin-api/collection/distribution/detail/collection-record",
    method: "post",
    data
  });
}

/**
 * 催收任务重发
 */
export async function taskResend(recordId) {
  return axiosService({
    url: "/admin-api/collection/task/resend/" + recordId,
    method: "post",
  });
}

/*
 * 催收分案-未还借据明细
 */
export async function unpaidLoanDue(customerId) {
  return axiosService({
    url: "/admin-api/collection/distribution/detail/unpaid-loan-due/"+customerId,
    method: "post",
  });
}

/*
 * 催收分案-还款记录列表
 */
export async function repayDetailDue(data) {
  return axiosService({
    url: "/admin-api/collection/distribution/detail/repay-detail-due",
    method: "post",
    data
  });
}

export default {
  distributionList,
  distributionUserList,
  listCollectionStatusEnum,
  roleList,
  userSave,
  roleSave,
  baseInfo,
  taskResend,
  roleDefault,
  overdueLoanDue,
  unpaidLoanDue,
  repayDetailDue,
  collectionRecord,
};

Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
