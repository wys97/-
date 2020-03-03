/* 查询客户信息 */
import axiosService from "../axios";

export async function customerManage(params) {
  return axiosService({
        url: '/admin-api/customer/list',
        method: 'post',
        data: params,
    });
}

/* 查询客户信息详情 */
export async function customerInfoDetail(id) {
  return axiosService({
		url: '/admin-api/customer/detail/' + id,
		method: 'post',
	});
}

/*客户信息管理账户信息 */

export async function customerAccount(params) {
  return axiosService({
        url: '/admin-api/customer/account-list',
        method: 'post',
        data: params,
    });
}

/* 账户详情 */
export async function customerAccountDetail(id) {
  return axiosService({
		url: '/admin-api/customer/account-detail/' + id,
		method: 'post',
	});
}

/* 评分列表 */
export async function customerGrade(params) {
  return axiosService({
		url: '/admin-api/customer/grade-list',
		method: 'post',
		data: params,
	});
}

/* 评分详情 */
export async function customerGradeDetail(id) {
  return axiosService({
		url: '/admin-api/customer/grade-detail-top/' + id,
		method: 'post',
	});
}

/* 评分详情-规则集列表 */
export async function ruleList(params) {
  return axiosService({
		url: '/admin-api/customer/grade-detail-list',
		method: 'post',
		data: params,
	});
}

/* 合同列表 */
export async function contractList(params) {
  return axiosService({
		url: '/admin-api/customer/contract-list',
		method: 'post',
		data: params,
	})
}

export default {
    customerManage,
    customerInfoDetail,
    customerAccount,
    customerAccountDetail,
    customerGrade,
    customerGradeDetail,
    ruleList,
    contractList,
}
