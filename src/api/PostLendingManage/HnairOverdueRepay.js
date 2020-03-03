/* 逾期明细相关接口 */
import axiosService from "../axios";

/*
 * 列表
 */
export async function overdueDetailList({
  dueId,
  customerName,
  phone,
  identityNo,
  overdueDayBegin,
  overdueDayEnd,
  overdueAmountBegin,
  overdueAmountEnd,
  overdueTotalAmountBegin,
  overdueTotalAmountEnd,
  isClear,
  page,
  limit
}) {
  const params = {
    dueId,
    customerName,
    phone,
    identityNo,
    overdueDayBegin,
    overdueDayEnd,
    overdueAmountBegin,
    overdueAmountEnd,
    overdueTotalAmountBegin,
    overdueTotalAmountEnd,
    isClear,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/overdue-detail/list",
    method: "post",
    data: params
  });
}

/**
 * 是否结清下拉
 */
export async function commonYesOrNo() {
  return axiosService({
    url: "/admin-api-hnair/common/yes-or-no",
    method: "post"
  });
}
/**
 * 获取 逾期总金额 ，本金 ，利息
 */
export async function statisticsMoney(data) {
  return axiosService({
    url: "/admin-api-hnair/overdue-detail/total",
    method: "post",
    data
  });
}

// 导出
export async function exportExcel({
  dueId,
  productName,
  customerName,
  identityNo,
  phone,
  loanAmount,
  loanBalance,
  loanTerm,
  repayMethodText,
  overdueDays,
  overduePrincipal,
  overdueInterest,
  overdueFine,
  overdueAmount,
  overdueDayBegin,
  overdueDayEnd,
  overdueAmountBegin,
  overdueAmountEnd,
  overdueTotalAmountBegin,
  overdueTotalAmountEnd,
  isClearText,
  isClear,
  page,
  limit
}) {
  const params = {
    dueId: dueId ? dueId : "",
    productName: productName ? productName : "",
    customerName: customerName ? customerName : "",
    phone: phone ? phone : "",
    identityNo: identityNo ? identityNo : "",
    loanAmount: loanAmount ? loanAmount : "",
    loanBalance: loanBalance ? loanBalance : "",
    loanTerm: loanTerm ? loanTerm : "",
    repayMethodText: repayMethodText ? repayMethodText : "",
    overdueDays: overdueDays ? overdueDays : "",
    overduePrincipal: overduePrincipal ? overduePrincipal : "",
    overdueInterest: overdueInterest ? overdueInterest : "",
    overdueFine: overdueFine ? overdueFine : "",
    overdueAmount: overdueAmount ? overdueAmount : "",
    overdueDayBegin: overdueDayBegin ? overdueDayBegin : "",
    overdueDayEnd: overdueDayEnd ? overdueDayEnd : "",
    overdueAmountBegin: overdueAmountBegin ? overdueAmountBegin : "",
    overdueAmountEnd: overdueAmountEnd ? overdueAmountEnd : "",
    overdueTotalAmountBegin: overdueTotalAmountBegin ? overdueTotalAmountBegin : "",
    overdueTotalAmountEnd: overdueTotalAmountEnd ? overdueTotalAmountEnd : "",
    isClearText: isClearText ? isClearText : "",
    isClear: isClear ? isClear : "",
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/finace-settle/exportoverdue",
    method: "post",
    data: params,
    responseType: "blob"
  });
}

export default {
  overdueDetailList,
  commonYesOrNo,
  exportExcel,
  statisticsMoney
};

Date.prototype.Format = function(fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
