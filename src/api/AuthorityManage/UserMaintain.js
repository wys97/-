/* 用户管理相关接口 */
import axiosService from "../axios";

/*
 * 新增用户
 */
export async function addUser({loginName, operatorName, loginPassword, roleIds, remark}) {
  const params = {
    loginName,
    operatorName,
    loginPassword,
    roleIds,
    remark
  };
  return axiosService({
    url: '/admin-api/operator/add',
    method: 'post',
    data: params,
  });
}

/*
 * 用户查询
 */
export async function queryUser({loginName, operatorName, roleId, status, page, limit}) {
  const params = {
    loginName,
    operatorName,
    roleId,
    status,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api/operator/list',
    method: 'post',
    data: params,
  });
}

/*
 * 角色下拉列表
 */
export async function roleSelectList() {
  return axiosService({
    url: '/admin-api/operator/role-select-list',
    method: 'post'
  });
}

/*
 * 用户明细查询
 */
export async function queryUserDetail(id) {
  return axiosService({
    url: '/admin-api/operator/detail/'+id,
    method: 'post'
  });
}

/*
 * 用户信息修改
 */
export async function editUserInfo({id, operatorName, roleIds, remark}) {
  const params = {
    id,
    operatorName,
    roleIds,
    remark
  };
  return axiosService({
    url: '/admin-api/operator/update',
    method: 'post',
    data: params
  })
}

/*
 * 用户停用
 */
export async function disableUser(id) {
  return axiosService({
    url: '/admin-api/operator/disable/'+id,
    method: 'post'
  });
}

/*
 * 用户启用
 */
export async function enableUser(id) {
  return axiosService({
    url: '/admin-api/operator/enable/'+id,
    method: 'post'
  });
}

/*
 * 用户解锁
 */
export async function unlockUser(id) {
  return axiosService({
    url: '/admin-api/operator/unlock/' + id,
    method: 'post'
  });
}

/*
 * 重置密码
 */
export async function resetUserPwd(id) {
  return axiosService({
    url: '/admin-api/operator/reset-password/'+id,
    method: 'post'
  });
}

export default {
  queryUser,
  addUser,
  roleSelectList,
  queryUserDetail,
  editUserInfo,
  disableUser,
  enableUser,
  unlockUser,
  resetUserPwd
}
