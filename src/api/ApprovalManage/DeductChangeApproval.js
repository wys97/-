/* 扣款日变更审批相关接口 */
import axiosService from "../axios";

/*
 * 扣款日变更列表查询
 */
export async function queryApprovalList({approvalId, changeId, dueId, customerName, identityNo, phone, partnerName, productName, approvalStatus, page, limit}) {
  const params = {
    approvalId,
    changeId,
    dueId,
    customerName,
    identityNo,
    phone,
    partnerName,
    productName,
    approvalStatus,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api/change-repay-day-approval/list',
    method: 'post',
    data: params,
  });
}


/*
 * 扣款日变更明细查询
 */
export async function queryApprovalDetail(id) {
  return axiosService({
    url: '/admin-api/change-repay-day-approval/approval-detail/' + id,
    method: 'post'
  });
}

/*
 * 扣款日变更修改明细查询
 */
export async function queryEditApproval(id) {
  return axiosService({
    url: '/admin-api/change-repay-day-approval/change-detail/' + id,
    method: 'post'
  });
}

/*
 * 扣款日变更审批
 */
export async function approvalDateChange({approvalId, approvalStatus, approvalOpinion}) {
  const params = {
    approvalId,
    approvalStatus,
    approvalOpinion
  }
  return axiosService({
    url: '/admin-api/change-repay-day-approval/approval',
    method: 'post',
    data: params,
  });
}

export default {
  queryApprovalList,
  queryApprovalDetail,
  queryEditApproval,
  approvalDateChange
}
