/* 退款退票相关接口 */
import axiosService from "../axios";

/*
 * 退票明细-退款类型查询
 */
export async function refundTicketType() {
  return axiosService({
    url: '/admin-api-hnair/refund-detail/refundTicket-type',
    method: 'post'
  })
}


/*
 * 退票明细-退款处理类型查询
 */
export async function refundType() {
  return axiosService({
    url: '/admin-api-hnair/refund-detail/refund-type',
    method: 'post'
  })
}


/*
 * 退票列表查询
 */
export async function refundDetailList({refundSerial, dueId, contractNo, ticketNo, customerName, phone, identityNo, refundTicketType, repayType, loanDate, page, limit}) {
  let beginPayDate = '';
  let endPayDate = '';
  if (loanDate && loanDate.length > 0) {
    loanDate.map((item, index) => {
      if (index) {
        endPayDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginPayDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    refundSerial,
    dueId,
    contractNo,
    ticketNo,
    customerName,
    phone,
    identityNo,
    refundTicketType,
    repayType,
    beginPayDate,
    endPayDate,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api-hnair/refund-detail/list',
    method: 'post',
    data: params,
  });
}

// 导出
export async function exportExcel({refundSerial, dueId, contractNo, ticketNo, customerName, phone, identityNo, refundTicketType, repayType, loanDate}) {
  let beginPayDate = '';
  let endPayDate = '';
  if (loanDate && loanDate.length > 0) {
    loanDate.map((item, index) => {
      if (index) {
        endPayDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginPayDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    refundSerial: refundSerial ? refundSerial : '',
    dueId: dueId ? dueId : '',
    contractNo: contractNo ? contractNo : '',
    ticketNo: ticketNo ? ticketNo : '',
    customerName: customerName ? customerName : '',
    phone: phone ? phone : '',
    identityNo: identityNo ? identityNo : '',
    refundTicketType: refundTicketType ? refundTicketType : '',
    repayType: repayType ? repayType : '',
    beginPayDate: beginPayDate ? beginPayDate : '',
    endPayDate: endPayDate ? endPayDate : ''
  };
  return axiosService({
    url: '/admin-api-hnair/finace-settle/exportRefund',
    method: 'post',
    data: params,
    responseType: 'blob'
  });
}

export default {
  refundDetailList,
  refundTicketType,
  refundType,
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
