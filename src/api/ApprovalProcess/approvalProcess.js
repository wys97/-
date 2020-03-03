/* 审批分案相关接口 */
import axiosService from "../axios";

/*
 * 列表
 */
export async function approvalList({
    approvalId,
    changeId,
    productName,
    customerName,
    phone,
    identityNo,
    approvalStatus,
    currentLevel,
    operatorName,
    page,
    limit
}) {
    const params = {
        id: approvalId,
        approvalOrderId: changeId,
        approvalOperator: operatorName,
        productName: productName,
        customerName: customerName,
        identityNo: identityNo,
        phone: phone,
        currentLevel: currentLevel,
        approvalType: approvalStatus,
        page: page,
        limit: limit
    };
    return axiosService({
        url: "admin-api-hnair/approval-division/list",
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        data: params
    })
}



//审批状态
export async function  listApprovalType (){
    return axiosService({
        url: "admin-api-hnair/approval-division/listApprovalTypeEnum",
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

// 审批节点
export async function  listCurrentLevel (){
    return axiosService({
        url: "admin-api-hnair/approval-division/listCurrentLevelEnum",
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
    })
}


/* 审批分案-用户列表 */
export async function listAdminOperator({
   productNo,
   approvalLevel,
   approvalType
 }) {
  const params = {
    productNo,
    approvalLevel,
    approvalType
  };
  return axiosService({
    url: "admin-api-hnair/approval-division/listAdminOperator",
    method: "post",
    data: params
  });
}


/* 审批分案-修改 */
export async function updateDivision(data) {
  return axiosService({
    url: "admin-api-hnair/approval-division/updateDivision",
    method: "post",
    data
  });
}


export default {
    approvalList,
    listApprovalType,
    listCurrentLevel,
    listAdminOperator,
    updateDivision
}