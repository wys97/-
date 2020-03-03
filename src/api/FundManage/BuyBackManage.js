/* 代偿管理相关接口 */
import axiosService from "../axios";

/*
 * 代偿状态
 */
export async function buyBackStatus() {
  return axiosService({
    url: '/admin-api/buyback/status',
    method: 'post'
  });
}

/**
 * 列表
 */
export async function buyBackList(data) {
  return axiosService({
		url: '/admin-api/buyback/list',
		method: 'post',
		data
	});
}

/**
 * 详情
 */
export async function buyBackDetail(id) {
  return axiosService({
		url: '/admin-api/buyback/detail/' + id,
		method: 'post'
	});
}

/**
 * 明细列表
 */
export async function detailList(data) {
  return axiosService({
		url: '/admin-api/buyback/list-detail',
		method: 'post',
		data
	});
}

/**
 * 核销
 */
export async function verify(id) {
  return axiosService({
		url: '/admin-api/buyback/clear/' + id,
		method: 'post'
	});
}

export default {
	buyBackStatus,
	buyBackList,
	buyBackDetail,
	detailList,
	verify
}
