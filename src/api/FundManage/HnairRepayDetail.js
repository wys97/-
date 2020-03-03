/* 海航-还款明细相关接口 */
import axiosService from "../axios";

/*
 * 还款状态查询
 */
export async function loanPayRepayStatus() {
  return axiosService({
    url: '/admin-api-hnair/loan-pay/repay-status',
    method: 'post'
  })
}


/*
 * 还款方式查询
 */
export async function loanPayDebitMethod() {
  return axiosService({
    url: '/admin-api-hnair/loan-pay/debit-method',
    method: 'post'
  })
}


/*
 * 还款类型查询
 */
export async function loanPayRepayType() {
  return axiosService({
    url: '/admin-api-hnair/loan-pay/repay-type',
    method: 'post'
  })
}


/*
 * 还款明细-列表查询
 */
export async function loanPayRepayList({repayRecordId, dueId, customerName, identityNo, phone, productName, repayStatus, debitMethod, repayType, repayBeginTime, page, limit}) {
  let beginDate = '';
  let endDate = '';
  if (repayBeginTime && repayBeginTime.length > 0) {
    repayBeginTime.map((item, index) => {
      if (index) {
        endDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    repayRecordId,
    dueId,
    customerName,
    identityNo,
    phone,
    productName,
    repayStatus,
    debitMethod,
    repayType,
    beginDate,
    endDate,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api-hnair/loan-pay/list-repay-detail',
    method: 'post',
    data: params
  });
}


/*
 * 还款明细详情查询
 */
export async function loanPayRepayDetail(id) {
  return axiosService({
    url: '/admin-api-hnair/loan-pay/repay-detail/' + id,
    method: 'post'
  });
}


/*
 * 还款明细-借据列表
 */
export async function repayDetailDueList(id) {
  return axiosService({
    url: '/admin-api-hnair/loan-pay/repay-detail-due-list/' + id,
    method: 'post'
  })
}

// 导出
export async function exportExcel({repayRecordId, dueId, customerName, identityNo, phone, repayStatus, debitMethod, repayType, repayBeginTime, productName}) {
  let beginDate = '';
  let endDate = '';
  if (repayBeginTime && repayBeginTime.length > 0) {
    repayBeginTime.map((item, index) => {
      if (index) {
        endDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    repayRecordId: repayRecordId ? repayRecordId : '',
    dueId: dueId ? dueId : '',
    customerName: customerName ? customerName : '',
    identityNo: identityNo ? identityNo : '',
    phone: phone ? phone : '',
    repayStatus: repayStatus ? repayStatus : '',
    debitMethod: debitMethod ? debitMethod : '',
    repayType: repayType ? repayType : '',
    beginDate: beginDate ? beginDate : '',
    endDate: endDate ? endDate : '',
    productName: productName ? productName : '',
  };
  return axiosService({
    url: '/admin-api-hnair/finace-settle/exportRepayItem',
    method: 'post',
    data: params,
    responseType: 'blob'
  });
}

export default {
  loanPayRepayList,
  loanPayRepayStatus,
  loanPayDebitMethod,
  loanPayRepayType,
  loanPayRepayDetail,
  repayDetailDueList,
  exportExcel
}

Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
