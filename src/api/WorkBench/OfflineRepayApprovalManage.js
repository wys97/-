/* 查询线下还款登记信息 */
import axiosService from "../axios";

export async function list(params) {
  return axiosService({
        url: '/admin-api/repay-record-offline-approval/list',
        method: 'post',
        data: params,
    });
}

export async function detail(id) {
  return axiosService({
		url: '/admin-api/repay-record-offline-approval/detail/' + id,
		method: 'post',
	});
}

export async function approval(params) {
  return axiosService({
		url: '/admin-api/repay-record-offline-approval/approval',
		method: 'post',
		data: params,
	})
}

export default {
	list,
	detail,
	approval
}
