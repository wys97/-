/* 业务配置-工作流设计相关接口 */
import axiosService from "../axios";

/**
 * 工作流维护-审批类型
 */
export async function getApprovalType() {
  return axiosService({
    url: "/admin-api-hnair/workflow/approval-type",
    method: "post"
  });
}

/**
 * 工作流维护-角色列表
 */
export async function getRole() {
  return axiosService({
    url: "/admin-api-hnair/workflow/role-list",
    method: "post"
  });
}

/**
 * 工作流维护-产品列表
 */
export async function getProductList() {
  return axiosService({
    url: "/admin-api-hnair/workflow/product-list",
    method: "post"
  });
}

/**
 * 工作流维护-产品列表
 */
export async function getApprovalLevel() {
  return axiosService({
    url: "/admin-api-hnair/workflow/level-list",
    method: "post"
  });
}

/**
 * 工作流维护-列表
 */
export async function workflowOperateList({productName, approvalName, approvalType, page, limit}) {
  const params = {
    productName,
    approvalName,
    approvalType,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/workflow/list",
    method: "post",
    data: params
  });
}

/**
 * 工作流维护-新增
 */
export async function addWorkflowOperate({approvalLevel, approvalName, approvalType, level1RoleId, level2RoleId, level3RoleId, productNo, remark}) {
  const params = {
    approvalLevel,
    approvalName,
    approvalType,
    level1RoleId,
    level2RoleId,
    level3RoleId,
    productNo,
    remark
  };
  return axiosService({
    url: "/admin-api-hnair/workflow/insert",
    method: "post",
    data: params
  });
}

/**
 * 工作流维护-修改
 */
export async function editWorkflowOperate({id, approvalLevel, approvalName, approvalType, level1RoleId, level2RoleId, level3RoleId, productNo, remark}) {
  const params = {
    id,
    approvalLevel,
    approvalName,
    approvalType,
    level1RoleId,
    level2RoleId,
    level3RoleId,
    productNo,
    remark
  };
  return axiosService({
    url: "/admin-api-hnair/workflow/update",
    method: "post",
    data: params
  });
}

/**
 * 工作流维护-详情
 */
export async function workflowOperateDetail(id) {
  return axiosService({
    url: "/admin-api-hnair/workflow/detail/" + id,
    method: "post"
  });
}

/**
 * 工作流维护-删除
 */
export async function delWorkflowOperate(id) {
  return axiosService({
    url: "/admin-api-hnair/workflow/delete/" + id,
    method: "post"
  });
}

export default {
  getApprovalType,
  workflowOperateList,
  addWorkflowOperate,
  editWorkflowOperate,
  workflowOperateDetail,
  delWorkflowOperate,
  getRole,
  getProductList,
  getApprovalLevel
};
