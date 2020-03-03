/* 催收明细相关接口 */
import axiosService from "../axios";

/*
 * 催收用户列表
 */
export async function userList({
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
    url: "/admin-api/collection/user/list",
    method: "post",
    data: params
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
 * 催收方式下拉
 */
export async function listCollectionRecordTypeEnum() {
  return axiosService({
    url: "/admin-api/collection/history/listCollectionRecordTypeEnum",
    method: "post"
  });
}

/*
 * 历史催收记录列表
 */
export async function historyList({
  customerName,
  customerPhone,
  customerIdentifyNo,
  startTime,
  currentOperatorName,
  collectionType,
  operatorName,
  page,
  limit
}) {
  let startTimeBegin = "";
  let startTimeEnd = "";
  if (startTime && startTime.length > 0) {
    startTime.map((item, index) => {
      if (index) {
        startTimeEnd = new Date(item).Format("yyyy-MM-dd");
      } else {
        startTimeBegin = new Date(item).Format("yyyy-MM-dd");
      }
    });
  }
  const params = {
    customerName,
    customerPhone,
    customerIdentifyNo,
    startTimeBegin,
    startTimeEnd,
    currentOperatorName,
    operatorName,
    collectionType,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api/collection/history/list",
    method: "post",
    data: params
  });
}

/*
 * 催收还款记录列表
 */
export async function repayRecordList({
  customerName,
  customerPhone,
  customerIdentifyNo,
  startTime,
  operatorName,
  collectionType,
  page,
  limit
}) {
  let dateBegin	 = "";
  let dateEnd	 = "";
  if (startTime && startTime.length > 0) {
    startTime.map((item, index) => {
      if (index) {
        dateEnd	 = new Date(item).Format("yyyy-MM-dd");
      } else {
        dateBegin = new Date(item).Format("yyyy-MM-dd");
      }
    });
  }
  const params = {
    customerName,
    customerPhone,
    customerIdentifyNo,
    dateBegin,
    dateEnd,
    operatorName,
    collectionType,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api/collection/repay-record/list",
    method: "post",
    data: params
  });
}

export default {
  userList,
  listCollectionStatusEnum,
  listCollectionRecordTypeEnum,
  historyList,
  repayRecordList
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
