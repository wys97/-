/* 放款明细相关接口 */
import axiosService from "../axios";

/*
 * 放款状态查询
 */
export async function loanRepayStatus() {
  return axiosService({
    url: '/admin-api-hnair/loan-repay/loan-repay-status',
    method: 'post'
  })
}


/*
 * 结算状态查询
 */
export async function loanRepaySettleStatus() {
  return axiosService({
    url: '/admin-api-hnair/loan-repay/settle-status',
    method: 'post'
  })
}

/*
 * 放款明细查询
 */
export async function loanRepayList({dueId, productName, customerName, phone, identityNo, loanDate, settleDate, loanPayStatus, settleStatus, contractNo, partnerApplyNo, page, limit}) {
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
  let beginSettleDate = '';
  let endSettleDate = '';
  if (settleDate && settleDate.length > 0) {
    settleDate.map((item, index) => {
      if (index) {
        endSettleDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginSettleDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    dueId,
    productName,
    customerName,
    phone,
    identityNo,
    beginPayDate,
    endPayDate,
    beginSettleDate,
    endSettleDate,
    loanPayStatus,
    settleStatus,
    contractNo,
    partnerApplyNo,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api-hnair/loan-repay/list',
    method: 'post',
    data: params,
  });
}

// 导出
export async function exportExcel({dueId, productName, customerName, phone, identityNo, loanDate, settleDate, loanPayStatus, settleStatus, contractNo, partnerApplyNo}) {
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
  let beginSettleDate = '';
  let endSettleDate = '';
  if (settleDate && settleDate.length > 0) {
    settleDate.map((item, index) => {
      if (index) {
        endSettleDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginSettleDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    dueId: dueId ? dueId : '',
    productName: productName ? productName : '',
    customerName: customerName ? customerName : '',
    phone: phone ? phone : '',
    identityNo: identityNo ? identityNo : '',
    beginPayDate: beginPayDate ? beginPayDate : '',
    endPayDate: endPayDate ? endPayDate : '',
    beginSettleDate: beginSettleDate ? beginSettleDate : '',
    endSettleDate: endSettleDate ? endSettleDate : '',
    loanPayStatus: loanPayStatus ? loanPayStatus : '',
    settleStatus: settleStatus ? settleStatus : '',
    contractNo: contractNo ? contractNo : '',
    partnerApplyNo: partnerApplyNo ? partnerApplyNo : ''
  };
  return axiosService({
    url: '/admin-api-hnair/finace-settle/exportLoanDue',
    method: 'post',
    data: params,
    responseType: 'blob'
  });
}

export default {
  loanRepayList,
  loanRepayStatus,
  loanRepaySettleStatus,
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
