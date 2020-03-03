/* 查询五级分类配置信息 */
import axiosService from "../axios";

// 列表
export async function list() {
  return axiosService({
        url: '/admin-api/loan-category-profile/list',
        method: 'post'
    });
}

// 修改
export async function update(data) {
  return axiosService({
        url: '/admin-api/loan-category-profile/update',
        method: 'post',
        data
    });
}

// 详情
export async function get(id) {
  return axiosService({
		url: '/admin-api/loan-category-profile/get/' + id,
		method: 'post'
	});
}

export default {
	list,
	update,
	get
}
