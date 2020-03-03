/* 查询授信审批管理信息 */
import axiosService from "../axios";

/* 授信审批信息列表 */
export async function creditApprovalList({
  customerId,
  customerName,
  phone,
  identityNo,
  productName,
  creditScoreStart,
  creditScoreEnd,
  creditType,
  riskResult,
  currentLevel,
  approvalStatus,
  page,
  limit
}) {
  const params = {
    customerId,
    customerName,
    phone,
    identityNo,
    productName,
    creditScoreStart,
    creditScoreEnd,
    creditType,
    riskResult,
    currentLevel,
    approvalStatus,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api/credit-approval/list",
    method: "post",
    data: params
  });
}

/* 授信审批-授信类型 */
export async function listCreditTypeEnum() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listCreditTypeEnum",
    method: "post"
  });
}

/* 授信审批-风控结果 */
export async function listRiskResultEnum() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listRiskResultEnum",
    method: "post"
  });
}

/* 授信审批-审批状态 */
export async function approvalStatus() {
  return axiosService({
    url: "/admin-api/common/approval-status",
    method: "post"
  });
}

/* 授信审批-审批节点 */
export async function listCurrentLevelEnum() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listCurrentLevelEnum",
    method: "post"
  });
}

/* 授信审批 - 贷款审批详情 */
export async function approvalDetail({ approvalId, currentLevel }) {
  const params = {
    approvalId,
    currentLevel
  };
  return axiosService({
    url: "/admin-api/credit-approval/detail",
    method: "post",
    data: params
  });
}

/* 授信审批 - 贷款审批 */
export async function addApproval({
  approvalId,
  approvalStatus,
  approvalOpinion,
  creditLimit
}) {
  const params = {
    approvalId,
    approvalStatus,
    approvalOpinion,
    creditLimit
  };
  return axiosService({
    url: "/admin-api/credit-approval/addApproval",
    method: "post",
    data: params
  });
}

export default {
  creditApprovalList,
  listCreditTypeEnum,
  listRiskResultEnum,
  approvalDetail,
  listCurrentLevelEnum,
  addApproval,
  approvalStatus
};
