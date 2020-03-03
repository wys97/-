/* 线下还款登记相关接口 */
import axiosService from "../axios";

/*
 * 状态
 */
export async function status() {
  return axiosService({
    url: '/admin-api/repay-record-offline/approval-status',
    method: 'post'
  });
}

/**
 * 列表
 */
export async function list({repayRecordId,dueId,customerName,identityNo,phone,partnerName,productName,approvalStatus,applyDate,page,limit}) {
	let beginDate = '';
	let endDate = '';
	if (applyDate && applyDate.length > 0) {
	    applyDate.map((item, index) => {
		    if (index) {
		    	endDate = new Date(item).Format('yyyy-MM-dd');
		    } else {
		    	beginDate = new Date(item).Format('yyyy-MM-dd');
		    }
		})
	}
	const params = {repayRecordId,dueId,customerName,identityNo,phone,partnerName,productName,approvalStatus,beginDate,endDate,page,limit}
  return axiosService({
		url: '/admin-api/repay-record-offline/list',
		method: 'post',
		data: params
	});
}

/**
 * 详情
 */
export async function detail(id) {
  return axiosService({
		url: '/admin-api/repay-record-offline/detail/' + id,
		method: 'post'
	});
}

export default {
	status,
	list,
	detail
}
