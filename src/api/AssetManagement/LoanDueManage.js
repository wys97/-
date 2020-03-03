/* 借据管理 */
import axiosService from "../axios";

/*
 * 借据状态
 */
export async function dueStatus () {
  return axiosService({
    url: '/admin-api/loan-due/due-status',
    method: 'post',
  });
}

/**
 * 借据列表
 */
export async function dueList({dueId,contractNo,customerName,identityNo,phone,partnerName,productName,dueStatus,endedDate,tradeType,page,limit}) {
	let beginDate = '';
	let endDate = '';
	if (endedDate && endedDate.length > 0) {
	    endedDate.map((item, index) => {
		    if (index) {
		    	endDate = new Date(item).Format('yyyy-MM-dd');
		    } else {
		    	beginDate = new Date(item).Format('yyyy-MM-dd');
		    }
		})
	}
	const params = {dueId,contractNo,customerName,identityNo,phone,partnerName,productName,dueStatus,beginDate,endDate,tradeType,page,limit}
  return axiosService({
		url: '/admin-api/loan-due/list',
		method: 'post',
		data: params
	});
}

/**
 * 借据信息
 */
export async function dueDetail(id) {
  return axiosService({
		url: '/admin-api/loan-due/info/' + id,
		method: 'post',
	});
}

/**
 * 进件资料
 */
export async function applyDetail(id) {
  return axiosService({
		url: '/admin-api/loan-due/detail/' + id,
		method: 'post',
	});
}

/**
 * 还款计划
 */
export async function repayPlan(id) {
  return axiosService({
		url: '/admin-api/loan-due/list-repay-plan/' + id,
		method: 'post',
	});
}

/**
 * 还款明细
 */
export async function repayDetail(id) {
  return axiosService({
		url: '/admin-api/loan-due/list-repay-record/' + id,
		method: 'post',
	});
}

/**
 * 欠款明细
 */
export async function overdueDetail(id) {
  return axiosService({
		url: '/admin-api/loan-due/list-overdue-detail/' + id,
		method: 'post',
	});
}

// 导出
export async function exportExcel({
  dueId,
  contractNo,
  customerName,
  identityNo,
  phone,
  partnerName,
  projectName,
  productName,
  loanAmount,
  loanBal,
  unpaidAmount,
  dueStatus,
	loanTerm,
	yearInterestRate,
	valueDate,
  dueDate,
  endedDate,
  page,
  limit
}) {
  let beginDate = '';
	let endDate = '';
	if (endedDate && endedDate.length > 0) {
	    endedDate.map((item, index) => {
		    if (index) {
		    	endDate = new Date(item).Format('yyyy-MM-dd');
		    } else {
		    	beginDate = new Date(item).Format('yyyy-MM-dd');
		    }
		})
	}
  const params = {
    dueId: dueId ? dueId : "",
    contractNo: contractNo ? contractNo : "",
    customerName: customerName ? customerName : "",
    identityNo: identityNo ? identityNo : "",
    phone: phone ? phone : "",
    partnerName: partnerName ? partnerName : "",
    projectName: projectName ? projectName : "",
    productName: productName ? productName : "",
    loanAmount: loanAmount ? loanAmount : "",
    loanBal: loanBal ? loanBal : "",
    unpaidAmount: unpaidAmount ? unpaidAmount : "",
    dueStatus: dueStatus ? dueStatus : "",
    loanTerm: loanTerm && loanTerm._d ? new Date(loanTerm._d).Format("yyyy-MM-dd") : "",
		yearInterestRate: yearInterestRate ? yearInterestRate : "",
		valueDate: valueDate && valueDate._d ? new Date(valueDate._d).Format("yyyy-MM-dd") : "",
    dueDate: dueDate && dueDate._d ? new Date(dueDate._d).Format("yyyy-MM-dd") : "",
    beginDate: beginDate ? beginDate : "",
    endDate: endDate ? endDate : "",
		page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/finace-settle/exportDue",
    method: "post",
    data: params,
    responseType: "blob"
  });
}

/*
 * 借据状态
 */
export async function tradeTypeEnum () {
  return axiosService({
    url: '/admin-api/loan-due/tradeTypeEnum',
    method: 'get',
  });
}


export default {
	dueStatus,
	dueList,
	dueDetail,
	applyDetail,
	repayPlan,
	repayDetail,
	overdueDetail,
	exportExcel,
  tradeTypeEnum
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

