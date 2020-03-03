/* 代偿管理相关接口 */
import axiosService from "../axios";

/*
 * 代偿状态
 */
export async function compensatoryStatus() {
  return axiosService({
    url: '/admin-api/compensate/status',
    method: 'post'
  });
}

/**
 * 列表
 */
export async function compensatoryList(data) {
  return axiosService({
		url: '/admin-api/compensate/list',
		method: 'post',
		data
	});
}

/**
 * 详情
 */
export async function compensatoryDetail(id) {
  return axiosService({
		url: '/admin-api/compensate/detail/' + id,
		method: 'post'
	});
}

/**
 * 明细列表
 */
export async function detailList(data) {
  return axiosService({
		url: '/admin-api/compensate/list-detail',
		method: 'post',
		data
	});
}

/**
 * 核销
 */
export async function verify(id) {
  return axiosService({
		url: '/admin-api/compensate/clear/' + id,
		method: 'post'
	});
}

export default {
	compensatoryStatus,
	compensatoryList,
	compensatoryDetail,
	detailList,
	verify
}
