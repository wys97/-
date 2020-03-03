/* 查询支用审批管理信息 */
import axiosService from "../axios";

export async function approvalList(params) {
  return axiosService({
        url: '/admin-api/loan-approval/list',
        method: 'post',
        data: params,
    });
}

export async function approvalDetail(id) {
  return axiosService({
		url: '/admin-api/loan-approval/detail/' + id,
		method: 'post',
	});
}

export async function addApproval(params) {
  return axiosService({
		url: '/admin-api/loan-approval/add-approval',
		method: 'post',
		data: params,
	})
}

/**
 * 详情, 进度条
 */
export async function headInfo(id) {
  return axiosService({
		url: '/admin-api/loan-approval/apply-head-info/' + id,
		method: 'post',
	});
}

/**
 * 进件信息, 详情
 */
export async function detail(id) {
  return axiosService({
		url: '/admin-api/loan-approval/apply-detail/' + id,
		method: 'post',
	});
}

/**
 * 筛查结果, 详情
 */
export async function ruleDetail(id) {
  return axiosService({
		url: '/admin-api/loan-approval/apply-rule-detail/' + id,
		method: 'post',
	});
}

/**
 * 风控结果, 详情
 */
export async function riskDetail(id) {
  return axiosService({
		url: '/admin-api/loan-approval/apply-risk-detail/' + id,
		method: 'post',
	});
}

/**
 * 人工审批, 详情
 */
export async function loanApproval(id) {
  return axiosService({
		url: '/admin-api/loan-approval/apply-loan-approval/' + id,
		method: 'post',
	});
}

/**
 * 借据信息, 详情
 */
export async function loanDue(id) {
  return axiosService({
		url: '/admin-api/loan-approval/apply-loan-due/' + id,
		method: 'post',
	});
}


export default {
	approvalList,
	approvalDetail,
	addApproval,
	headInfo,
	detail,
	ruleDetail,
  riskDetail,
  loanApproval,
  loanDue,
}
