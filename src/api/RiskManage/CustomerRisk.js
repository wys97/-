/* 客户风控评分信息 */
import axiosService from "../axios";

/**
 * 评级结果下拉
 */
export async function ratingResult() {
  return axiosService({
		url: '/admin-api/customer-risk-score/rating-result',
		method: 'post'
	})
}

/**
 * 列表
 */
export async function list(data) {
  return axiosService({
		url: '/admin-api/customer-risk-score/list',
		method: 'post',
		data
	});
}

/**
 * 详情
 */
export async function detail(id) {
  return axiosService({
		url: '/admin-api/customer-risk-score/detail-top/' + id,
		method: 'post'
	});
}

/**
 * 规则集列表
 */
export async function detailList(data) {
  return axiosService({
		url: '/admin-api/customer-risk-score/detail-list',
		method: 'post',
		data
	});
}

export default {
	ratingResult,
	list,
	detail,
	detailList
}
