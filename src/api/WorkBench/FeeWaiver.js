/* 息费减免审批*/
import axiosService from "../axios";

export async function approvalStatus() {
  return axiosService({
        url: '/admin-api/decrease-interest-approval/status',
        method: 'post',
    });
}

export async function approvalList(params) {
  return axiosService({
		url: '/admin-api/decrease-interest-approval/list',
		method: 'post',
		data: params,
	});
}

export async function approvalDetail(id) {
  return axiosService({
		url: 'admin-api/decrease-interest-approval/getApprovalDetail/' + id,
		method: 'post',
	});
}
/**
 * 详情-列表
 */
export async function decreaseDetailList(decreaseInterestId) {
  return axiosService({
		url: 'admin-api/decrease-interest-approval/getApprovalDetailList/' + decreaseInterestId,
		method: 'post'
	});
}

export async function addApproval(params) {
  return axiosService({
		url: '/admin-api/decrease-interest-approval/approvalDecreaseInterest',
		data: params,
		method: 'post',
	});
}

export default {
	approvalStatus,
	approvalList,
	approvalDetail,
	addApproval,
	decreaseDetailList,
}
