/* 逾期明细相关接口 */
import axiosService from "../axios";

/*
 * 列表
 */
export async function overdueRepayList(params) {
  return axiosService({
    url: '/admin-api/overdue-repay-plan/list',
    method: 'post',
    data: params
  });
}

/**
 * 详情
 */
export async function overdueRepayDetail(id) {
  return axiosService({
		url: '/admin-api/overdue-repay-plan/detail/' + id,
		method: 'post'
	});
}

export default {
	overdueRepayList,
	overdueRepayDetail
}
