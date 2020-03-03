/* 贷款五级分类信息 */
import axiosService from "../axios";

/**
 * 五级状态
 */
export async function categoryStatus() {
  return axiosService({
		url: '/admin-api/loan-category/loan-category-status',
		method: 'post'
	})
}

/**
 * 生效标志
 */
export async function validStatus() {
  return axiosService({
		url: '/admin-api/loan-category/valid-status',
		method: 'post'
	});
}

/**
 * 列表
 */
export async function list(data) {
  return axiosService({
		url: '/admin-api/loan-category/list',
		method: 'post',
		data
	});
}

/**
 * 详情
 */
export async function detail(dueId) {
  return axiosService({
		url: '/admin-api/loan-category/detail/'+dueId,
		method: 'post',
	});
}

/**
 * 修改
 */
export async function update(data) {
  return axiosService({
		url: '/admin-api/loan-category/update',
		method: 'post',
		data
	});
}

/**
 * 修改页-五级状态
 */
export async function loanCategoryStatus(data) {
  return axiosService({
		url: '/admin-api/loan-category/loan-category-status',
		method: 'post',
		data
	});
}

export default {
	categoryStatus,
	validStatus,
	list,
	detail,
	update,
	loanCategoryStatus
}
