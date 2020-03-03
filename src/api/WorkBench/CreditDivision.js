/* 查询授信分案信息 */
import axiosService from "../axios";

/* 授信分案列表 */
export async function listApprovalCredit({
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
                                           operatorName,
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
    operatorName,
    page,
    limit
  };
  return axiosService({
    url: "admin-api-hnair/customer-credit/list-division",
    method: "post",
    data: params
  });
}

/* 授信分案-审批节点 */
export async function listCurrentLevelEnum() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listCurrentLevelEnum",
    method: "post"
  });
}

/* 授信分案-用户列表 */
export async function listAdminOperator
({
   productNo,
   approvalLevel
 }) {
  const params = {
    productNo,
    approvalLevel
  };
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listAdminOperator",
    method: "post",
    data: params
  });
}

/* 授信分案-修改 */
export async function updateDivision(data) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/updateDivision",
    method: "post",
    data
  });
}

export default {
  listApprovalCredit,
  listCurrentLevelEnum,
  listAdminOperator,
  updateDivision
};
