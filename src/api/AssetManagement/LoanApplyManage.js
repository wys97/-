/* 贷款申请相关接口 */
import axiosService from "../axios";

/*
 * 支用渠道
 */
export async function tradeType () {
  return axiosService({
    url: '/admin-api/common/loan-trade-type',
    method: 'post',
  });
}
/*
 * 申请状态
 */
export async function applyStatus () {
  return axiosService({
    url: '/admin-api/loan-apply/loan-status',
    method: 'post',
  });
}

/*
 * 申请列表
 */
export async function applyList({applyId,contractNo,customerName,identityNo,phone,partnerName,productName,applyStatus,tradeType,applyDate,page,limit}) {
	let beginDate = '';
	let endDate = '';
	if (applyDate && applyDate.length > 0) {
	    applyDate.map((item, index) => {
		    if (index) {
		    	endDate = new Date(item).Format('yyyy-MM-dd');
		    } else {
		    	beginDate = new Date(item).Format('yyyy-MM-dd');
		    }
		})
	}
	const params = {applyId,contractNo,customerName,identityNo,phone,partnerName,productName,applyStatus,tradeType,beginDate,endDate,page,limit}
  return axiosService({
		url: '/admin-api/loan-apply/list',
		method: 'post',
		data: params
	});
}

/**
 * 详情, 进度条
 */
export async function headInfo(id) {
  return axiosService({
		url: '/admin-api/loan-apply/head-info/' + id,
		method: 'post',
	});
}

/**
 * 进件信息, 详情
 */
export async function detail(id) {
  return axiosService({
		url: '/admin-api/loan-apply/detail/' + id,
		method: 'post',
	});
}

/**
 * 进件信息, 合同详情
 */
export async function contract(id) {
  return axiosService({
		url: 'admin-api/loan-apply/contract/' + id,
		method: 'post',
	});
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
		url: '/admin-api/loan-apply/rule-detail/' + id,
		method: 'post',
	});
}

/**
 * 风控结果, 详情
 */
export async function riskDetail(id) {
  return axiosService({
		url: '/admin-api/loan-apply/risk-detail/' + id,
		method: 'post',
	});
}

/**
 * 人工审批, 详情
 */
export async function loanApproval(id) {
  return axiosService({
		url: '/admin-api/loan-apply/loan-approval/' + id,
		method: 'post',
	});
}

/**
 * 借据信息, 详情
 */
export async function loanDue(id) {
  return axiosService({
		url: '/admin-api/loan-apply/loan-due/' + id,
		method: 'post',
	});
}

// 导出
export async function exportExcel({
  applyId,
  contractNo,
  customerName,
  identityNo,
  phone,
  partnerName,
  projectName,
  productName,
  loanAmount,
  loanTerm,
  loanInterest,
  applyStatus,
  tradeType,
  applyTime,
  applyDate,
  page,
  limit
}) {
  let beginDate = '';
	let endDate = '';
  if (applyDate && applyDate.length > 0) {
    applyDate.map((item, index) => {
      if (index) {
        endDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginDate = new Date(item).Format('yyyy-MM-dd');
      }
  })
}
  const params = {
    applyId: applyId ? applyId : "",
    contractNo: contractNo ? contractNo : "",
    customerName: customerName ? customerName : "",
    identityNo: identityNo ? identityNo : "",
    phone: phone ? phone : "",
    partnerName: partnerName ? partnerName : "",
    projectName: projectName ? projectName : "",
    productName: productName ? productName : "",
    loanAmount: loanAmount ? loanAmount : "",
    loanTerm: loanTerm ? loanTerm : "",
    loanInterest: loanInterest ? loanInterest : "",
    applyStatus: applyStatus ? applyStatus : "",
    tradeType: tradeType ? tradeType : "",
    beginDate: beginDate ? beginDate : "",
    endDate: endDate ? endDate : "",
    applyTime: applyTime && applyTime._d ? new Date(applyTime._d).Format("yyyy-MM-dd") : "",
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/finace-settle/exportLoanApply",
    method: "post",
    data: params,
    responseType: "blob"
  });
}



// 重新发起风控
export async function toRequest(data){
  return axiosService({
    url:'/admin-api/loan-apply/resubmit-risk',
    method:'post',
    data
  })
}



export default {
  applyStatus,
  tradeType,
  applyList,
  headInfo,
  detail,
  ruleDetail,
  riskDetail,
  loanApproval,
  loanDue,
  detailAccountList,
  creditHistory,
  loanApplyRecord,
  exportExcel,
  contract,
  toRequest
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
