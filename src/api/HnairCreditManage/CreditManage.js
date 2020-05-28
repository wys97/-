/* 贷款业务管理-授信记录相关接口 */
import axiosService from "../axios";


/**
 * 授信管理-列表
 */
export async function customerCreditList({
  customerId,
  customerName,
  phone,
  identityNo,
  productName,
  creditScoreStart,
  creditScoreEnd,
  creditType,
  tradeType,
  riskResult,
  operatorName,
  creditStatus,
  page,
  limit
}) {
  const params = {
    customerId,
    customerName,
    phone,
    identityNo,
    productName,
    creditScoreStart,
    creditScoreEnd,
    creditType,
    tradeType,
    riskResult,
    operatorName,
    creditStatus,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/customer-credit/list",
    method: "post",
    data: params
  });
}

/*
 * 授信管理-授信类型 下拉框
 */
export async function listCreditTypeEnum() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listCreditTypeEnum",
    method: "post"
  });
}
/*
 * 授信管理-授信类型 下拉框
 */
export async function listCreditChannel() {
  return axiosService({
    url: "/admin-api/common/credit-trade-type",
    method: "post"
  });
}

/*
 * 授信管理-风控结果 下拉框
 */
export async function listRiskResultEnum() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listRiskResultEnum",
    method: "post"
  });
}

/*
 * 授信管理-授信结果 下拉框
 */
export async function listCreditResultEnum() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listCreditResultEnum",
    method: "post"
  });
}

/*
 * 授信管理-状态 下拉框
 */
export async function listLimitStatusEnum() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listLimitStatusEnum",
    method: "post"
  });
}
export async function creditResult() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/credit-result",
    method: "post"
  });
}

/**
 * 授信申请记录-详情
 */
export async function customerDetailCredit(customerId) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/detail-credit/" + customerId,
    method: "post"
  })
}

/**
 * 授信申请记录-影像资料
 */
export async function listImageByCustomer({customerId,page,limit}) {
  const params = {
    customerId,
    page,
    limit,
  }
  return axiosService({
    url: "/admin-api-hnair/customer-info/listImageByCustomer",
    method: "post",
    data:params
  })
}

/**
 * 客户资料, 详情
 */
export async function detailAccountList(id) {
  return axiosService({
		url: '/admin-api/loan-apply/customer-info/' + id,
		method: 'post',
	});
}

/**
 * 历史授信, 详情
 */
export async function creditHistory(id) {
  return axiosService({
		url: '/admin-api/loan-apply/credit-history/' + id,
		method: 'post',
	});
}

/**
 * 风控结果, 详情
 */
export async function creditInfo(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/detail-credit/" + id,
    method: "post"
  });
}

/**
 * 支用记录, 详情
 */
export async function loanApplyRecord(id) {
  return axiosService({
		url: '/admin-api/loan-apply/record/' + id,
		method: 'post',
	});
}

/**
 * 筛查结果, 详情
 */
export async function ruleDetail(id) {
  return axiosService({
		url: 'admin-api-hnair/customer-credit/rule-detail/' + id,
		method: 'post',
	});
}

/**
 * 触发人工审批, 详情
 */
export async function creditApprovalRules(id) {
  return axiosService({
		url: '/admin-api/credit-approval/rules/' + id,
		method: 'post',
	});
}

/**
 * 人工审批审批详情, 详情
 */
export async function approvalRecord(id) {
  return axiosService({
		url: '/admin-api/credit-approval/approvalRecord/' + id,
		method: 'post',
	});
}

/**
 * 授信申请详情-授信资料
 */
export async function customerReadCredit(customerId) {
  return axiosService({
    url: "admin-api-hnair/customer-credit/readCredit/" + customerId,
    method: "post"
  });
}

/**
 * 授信申请详情-合同信息
 */
export async function customerContract(creditId) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/contract/" + creditId,
    method: "post"
  });
}

/**
 * 授信-规则详情
 */
export async function creditRules(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/rules/" + id,
    method: "post"
  })
}

/**
 * 授信-授信记录状态
 */
export async function creditStatus(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/creditStatus/" + id,
    method: "post"
  })
}

/**
 * 重新发起风控
 */
export async function toRequest(data) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/riskControl",
    method: "post",
    data
  })
}

// 导出
export async function exportExcel({
  customerId,
  customerName,
  phone,
  identityNo,
  productName,
  creditScoreStart,
  creditScoreEnd,
  creditType,
  tradeType,
  riskResult,
  operatorName,
  creditStatus,
  page,
  limit
}) {
  const params = {
    customerId: customerId ? customerId : "",
    customerName: customerName ? customerName : "",
    phone: phone ? phone : "",
    identityNo: identityNo ? identityNo : "",
    productName: productName ? productName : "",
    creditScoreStart: creditScoreStart ? creditScoreStart : "",
    creditScoreEnd: creditScoreEnd ? creditScoreEnd : "",
    creditStatus: creditStatus ? creditStatus : "",
    operatorName: operatorName ? operatorName : "",
    creditType: creditType ? creditType : "",
    tradeType: tradeType ? tradeType : "",
    riskResult: riskResult ? riskResult : "",
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/finace-settle/exportCreditRecord",
    method: "post",
    data: params,
    responseType: "blob"
  });
}

export default {
  customerCreditList,
  creditRules,
  listCreditTypeEnum,
  listCreditChannel,
  listRiskResultEnum,
  listCreditResultEnum,
  listLimitStatusEnum,
  customerReadCredit,
  detailAccountList,
  creditHistory,
  loanApplyRecord,
  creditResult,
  creditStatus,
  exportExcel,
  listImageByCustomer,
  creditApprovalRules,
  approvalRecord,
  creditInfo,
  ruleDetail,
  customerContract,
  toRequest
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
