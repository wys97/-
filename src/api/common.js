/* 公共接口 */
import axiosService from "./axios";

// 证件类型
export async function identityType() {
  return axiosService({
    url: '/admin-api/common/identity-type',
    method: 'post'
  });
}

// 审批状态
export async function approvalStatus() {
  return axiosService({
    url: '/admin-api/common/approval-status',
    method: 'post',
  });
}
export default {
  identityType,
  approvalStatus
}
