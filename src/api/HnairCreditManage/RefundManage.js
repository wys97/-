/* 溢交款明细相关接口 */
import axiosService from "../axios";

/*
 * 溢缴款明细 - 退票类型查询
 */
export async function overpayRefundTicketType() {
  return axiosService({
    url: '/admin-api-hnair/overpay/refund-ticket-type',
    method: 'post'
  })
}

/*
 * 溢缴款明细 - 审批状态查询
 */
export async function overpayApprovalStatus() {
  return axiosService({
    url: '/admin-api-hnair/overpay/approval-status',
    method: 'post'
  })
}


/*
 * 溢缴款明细 - 退款状态查询
 */
export async function overpayRefundStatus() {
  return axiosService({
    url: '/admin-api-hnair/overpay/refund-status',
    method: 'post'
  })
}


/*
 * 退票列表查询
 */
export async function overpayListOverpayDetail({refundSerial, dueId, identityNo, phone, customerName, refundTicketType, approvalStatus, refundStatus, beginDate, endDate, page, limit}) {
  const params = {
    refundSerial,
    dueId,
    identityNo,
    phone,
    customerName,
    refundTicketType,
    approvalStatus,
    refundStatus,
    beginDate: beginDate && beginDate._d ? new Date(beginDate._d).Format('yyyy-MM-dd') : '',
    endDate: endDate && endDate._d ? new Date(endDate._d).Format('yyyy-MM-dd') : '',
    page,
    limit
  };
  return axiosService({
    url: '/admin-api-hnair/overpay/list-overpay-detail',
    method: 'post',
    data: params
  })
}

/*
 * 溢缴款明细 - 审批
 */
export async function overpayApproval({repayRecordId, approvalStatus}) {
  const params = {
    repayRecordId,
    approvalStatus
  };
  return axiosService({
    url: '/admin-api-hnair/overpay/overpay-approval',
    method: 'post',
    data: params
  })
}

/*
 * 溢缴款明细 - 退款
 */
export async function overpayRefund(id) {
  return axiosService({
    url: '/admin-api-hnair/overpay/overpay-refund/' + id,
    method: 'post'
  })
}

// 导出
export async function exportExcel({refundSerial, dueId, identityNo, phone, customerName, refundTicketType, approvalStatus, refundStatus, beginDate, endDate}) {
  const params = {
    refundSerial: refundSerial ? refundSerial : '',
    dueId: dueId ? dueId : '',
    identityNo: identityNo ? identityNo : '',
    phone: phone ? phone : '',
    customerName: customerName ? customerName : '',
    refundTicketType: refundTicketType ? refundTicketType : '',
    approvalStatus: approvalStatus ? approvalStatus : '',
    refundStatus: refundStatus ? refundStatus : '',
    beginDate: beginDate && beginDate._d ? new Date(beginDate._d).Format('yyyy-MM-dd') : '',
    endDate: endDate && endDate._d ? new Date(endDate._d).Format('yyyy-MM-dd') : ''
  };
  return axiosService({
    url: '/admin-api-hnair/finace-settle/exportOverpay',
    method: 'post',
    data: params,
    responseType: 'blob'
  });
}

export default {
  overpayRefundTicketType,
  overpayApprovalStatus,
  overpayRefundStatus,
  overpayListOverpayDetail,
  overpayApproval,
  overpayRefund,
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
