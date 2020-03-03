/* 用户注册信息 */
import axiosService from "../axios";

/**
 * 授信状态下拉框
 */
export async function getCreditStatus() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listLimitStatusEnum",
    method: "post"
  });
}

// 用户状态下拉列表
export async function listUserStatusEnum() {
  return axiosService({
    url: "/admin-api-hnair/app-user/listUserStatusEnum",
    method: "get"
  });
}


// APP用户管理 - 列表
export async function list
({
   id,
   loginMobile,
   customerName,
   identityNo,
   page,
   limit,
   creditStatus,
   status
 }) {

  const params = {
    id,
    loginMobile,
    customerName,
    identityNo,
    page,
    limit,
    creditStatus,
    status
  };
  return axiosService({
    url: "/admin-api-hnair/app-user/list",
    method: "post",
    data: params
  });
}


/**
 * 授信用户列表-导出
 */
export async function exportExcel
({
   id,
   loginMobile,
   customerName,
   identityNo,
   page,
   limit,
   creditStatus,
   status
 }) {
  const params = {
    id,
    loginMobile,
    customerName,
    identityNo,
    page,
    limit,
    creditStatus,
    status
  };
  return axiosService({
    url: "/admin-api-hnair/finace-settle/exporAppUserInfo",
    method: "post",
    data: params,
    responseType: "blob"
  });
}

//APP用户管理 - 冻结、解冻
export async function update
({
   id,
   status
 }) {

  const params = {
    id,
    status
  };
  return axiosService({
    url: "/admin-api-hnair/app-user/updateUserStatus",
    method: "post",
    data: params
  });
}

// 积分明细 - 详情
export async function pointsDetail (id) {
  return axiosService({
    url: "admin-api-hnair/app-user/points-detail/" + id,
    method: "get",
  });
}

// 积分明细 - 列表
export async function pointsDetailList
({
   id,
   page,
   limit,
 }) {

  const params = {
    id,
    page,
    limit,
  };
  return axiosService({
    url: "/admin-api-hnair/app-user/points-detail-list",
    method: "post",
    data: params
  });
}

export default {
  getCreditStatus,
  listUserStatusEnum,
  list,
  update,
  exportExcel,
  pointsDetail,
  pointsDetailList,
}
