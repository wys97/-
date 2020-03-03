/* 息费减免管理相关接口 */
import axiosService from "../axios";

/**
 * 息费减免状态
 */
export async function getDecreaseStatus() {
  return axiosService({
    url: '/admin-api/decrease-interest/status',
    method: 'post'
  });
}

/**
 * 列表
 */
export async function decreaseList(data) {
  return axiosService({
		url: '/admin-api/decrease-interest/list',
		method: 'post',
		data
	});
}

/**
 * 详情
 */
export async function decreaseDetail(id) {
  return axiosService({
		url: '/admin-api/decrease-interest/detail/' + id,
		method: 'post'
	});
}

/**
 * 详情-列表
 */
export async function decreaseDetailList(decreaseInterestId) {
  return axiosService({
		url: '/admin-api/decrease-interest/detailList/' + decreaseInterestId,
		method: 'post'
	});
}

/**
 * 调整类型
 */
export async function rectifyType() {
  return axiosService({
		url: '/admin-api/decrease-interest/rectify-type',
		method: 'post',
	});
}

/**
 * 确认
 */
export async function decreaseConfirm(id) {
  return axiosService({
		url: '/admin-api/decrease-interest/confirm/' + id,
		method: 'post'
	});
}

/**
 * 删除
 */
export async function decreaseDelete(id) {
  return axiosService({
		url: '/admin-api/decrease-interest/delete/' + id,
		method: 'post'
	});
}

/**
 * 新增
 */
export async function decreaseAdd({ dueId, rectifyType, decreaseReason, list}) {
	let params = {
		dueId, rectifyType, decreaseReason, list
	};
  return axiosService({
		url: '/admin-api/decrease-interest/save',
		method: 'post',
		data: params
	});
}

/**
 * 修改
 */
export async function decreaseUpdate({ decreaseInterestId, dueId, rectifyType, decreaseReason, list}) {
	if(rectifyType == "新增") {
		rectifyType = "INCREASE"
	}else {
		rectifyType = "DECREASE"
	}
	let params = {
		decreaseInterestId, dueId, rectifyType, decreaseReason, list
	};
  return axiosService({
		url: '/admin-api/decrease-interest/update',
		method: 'post',
		data: params
	})
}

/**
 * 借据列表
 */
export async function dueList(params) {
  return axiosService({
		url: '/admin-api/decrease-interest/list-loan-due',
		method: 'post',
		data: params
	});
}

/**
 * 选择借据
 */
export async function selectDue(id) {
  return axiosService({
		url: 'admin-api/decrease-interest/get-loan-due/' + id,
		method: 'post'
	});
}
/**
 * 选择借据-借据列表
 */
export async function detailList(id) {
  return axiosService({
		url: 'admin-api/decrease-interest/unclear-plan/' + id,
		method: 'post'
	});
}

// 导出
export async function exportExcel(data) {
  return axiosService({
    url: "admin-api-hnair/finace-settle/export/decrease-interest",
    method: "post",
    data: data,
    responseType: "blob"
  });
}

export default {
	getDecreaseStatus,
	decreaseList,
	decreaseDetail,
	decreaseConfirm,
	decreaseDelete,
	decreaseAdd,
	decreaseUpdate,
	dueList,
  selectDue,
	exportExcel,
	detailList,
	rectifyType,
	decreaseDetailList
}
