/* 还款明细相关接口 */
import axiosService from "../axios";

/*
 * 还款状态查询
 */
export async function queryRepayStatus() {
  return axiosService({
    url: '/admin-api/loan-pay/repay-status',
    method: 'post'
  })
}

/*
 * 还款明细查询
 */
export async function queryRepayList({repayRecordId, dueId, customerName, identityNo, phone, partnerName, productName, repayStatus, repayBeginTime, page, limit}) {
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
    partnerName,
    productName,
    repayStatus,
    beginDate,
    endDate,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api/loan-pay/list-repay-detail',
    method: 'post',
    data: params
  });
}

/*
 * 还款明细详情查询
 */
export async function queryRepayDetail(id) {
  return axiosService({
    url: '/admin-api/loan-pay/repay-detail/' + id,
    method: 'post'
  });
}

export default {
  queryRepayStatus,
  queryRepayList,
  queryRepayDetail
}

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
