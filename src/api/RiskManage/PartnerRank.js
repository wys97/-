/* 合作机构评级信息 */
import axiosService from "../axios";

/**
 * 生效标志
 */
export async function validStatus() {
  return axiosService({
		url: '/admin-api/partner-rating/valid-status',
		method: 'post'
	})
}

/**
 * 列表
 */
export async function list(data) {
  return axiosService({
		url: '/admin-api/partner-rating/list',
		method: 'post',
		data
	});
}

/**
 * 详情
 */
export async function detail(id) {
  return axiosService({
		url: '/admin-api/partner-rating/detail/' + id,
		method: 'post'
	});
}

/**
 * 新增
 */
export async function save(data) {
  return axiosService({
		url: '/admin-api/partner-rating/save',
		method: 'post',
		data
	});
}

/**
 * 修改
 */
export async function update(data) {
  return axiosService({
		url: '/admin-api/partner-rating/update',
		method: 'post',
		data
	});
}

/**
 * 删除
 */
export async function remove(id) {
  return axiosService({
		url: '/admin-api/partner-rating/delete/' + id,
		method: 'post'
	});
}

/**
 * 合作机构
 */
export async function partnerInfo() {
  return axiosService({
		url: '/admin-api/common/partner-info',
		method: 'post'
	});
}

export default {
	validStatus,
	list,
	detail,
	save,
	update,
	remove,
	partnerInfo
}
