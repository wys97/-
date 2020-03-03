/* 黑名单审批*/
import axiosService from "../axios";

// 申请类型
export async function applyType() {
  return axiosService({
		url: '/admin-api/blacklist-approval/apply-type',
		method: 'post'
	});
}

// 列表
export async function list(data) {
  return axiosService({
    url: '/admin-api/blacklist-approval/list',
    method: 'post',
    data
  });
}

// 审批
export async function approval(data) {
  return axiosService({
    url: '/admin-api/blacklist-approval/approve',
    method: 'post',
    data
  });
}

// 详情
export async function detail(id) {
  return axiosService({
    url: `/admin-api/blacklist-approval/detail/${id}`,
    method: 'post'
  });
}

export default {
	applyType,
  list,
  approval,
  detail
}
