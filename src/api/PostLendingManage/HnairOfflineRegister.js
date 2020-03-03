/* 线下还款登记相关接口 */
import axiosService from "../axios";

/*
 * 状态
 */
export async function status() {
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/status',
    method: 'post'
  });
}

/*
 * 还款状态
 */
export async function repayStatus() {
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/repayStatus',
    method: 'post'
  });
}


/*
 * 还款类型
 */
export async function repayType() {
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/repayType',
    method: 'post'
  });
}

/**
 * 列表
 */
export async function list({dueId, customerName, phone, identityNo, repayType, paidDate, status, repayStatus, page, limit}) {
  let beginDate = '';
  let endDate = '';
  if (paidDate && paidDate.length > 0) {
    paidDate.map((item, index) => {
      if (index) {
        endDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    dueId,
    customerName,
    phone,
    identityNo,
    repayType,
    beginDate,
    endDate,
    status,
    repayStatus,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/list',
    method: 'post',
    data: params
  });
}

/**
 * 详情
 */
export async function detail(id) {
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/detail/' + id,
    method: 'post'
  });
}


/**
 * 删除
 */
export async function offlineDelete(id) {
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/delete/' + id,
    method: 'post'
  });
}

/**
 * 确认
 */
export async function offlineConfirm(id) {
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/confirm/' + id,
    method: 'post'
  });
}


/**
 * 修改
 */
export async function offlineUpdateSave({repayRecordId, paidDate, repayAmount, repayType, remark}) {
  const params = {
    repayRecordId,
    paidDate,
    repayAmount,
    repayType,
    remark
  };
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/update',
    method: 'post',
    data: params
  });
}


/**
 * 新增
 */
export async function offlineAddSave({dueId, repayAmount, paidDate, repayType, remark}) {
  const params = {
    dueId,
    repayAmount,
    paidDate,
    repayType,
    remark
  };
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/save',
    method: 'post',
    data: params
  });
}

/**
 * 线下还款记录 - 新增 - 借据列表
 */
export async function listLoanDue({dueId, contractNo, customerName, phone, identityNo, page, limit}) {
  const params = {
    dueId,
    contractNo,
    customerName,
    phone,
    identityNo,
    page,
    limit,
  };
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/list-loan-due',
    method: 'post',
    data: params
  });
}

/**
 * 选择借据
 */
export async function selectDue(id) {
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/get-loan-due/' + id,
    method: 'post'
  });
}

export async function getLoneDueByPaidDate(dueId,paidDate) {
  const params = {
    dueId,
    paidDate
  };
  return axiosService({
    url: '/admin-api-hnair/repay-record-offline/get-loan-due',
    method: 'post',
    data: params
  });
}

// 导出
export async function exportExcel({dueId, customerName, phone, identityNo, repayType, paidDate, status, repayStatus, page, limit}) {
  let beginDate = '';
  let endDate = '';
  if (paidDate && paidDate.length > 0) {
    paidDate.map((item, index) => {
      if (index) {
        endDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    dueId,
    customerName,
    phone,
    identityNo,
    repayType,
    beginDate,
    endDate,
    status,
    repayStatus,
    page,
    limit
  };
  return axiosService({
    url: "admin-api-hnair/finace-settle/export/offline",
    method: "post",
    data: params,
    responseType: "blob"
  });
}

export default {
  status,
  repayStatus,
  repayType,
  list,
  offlineUpdateSave,
  offlineDelete,
  offlineConfirm,
  offlineAddSave,
  listLoanDue,
  selectDue,
  detail,
  exportExcel,
  getLoneDueByPaidDate
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
