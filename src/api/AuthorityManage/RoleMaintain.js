/* 角色管理相关接口 */
import axiosService from "../axios";

/*
 * 新增角色
 */
export async function addRole({roleName, permissionCodes, remark}) {
  const params = {
    roleName,
    permissionCodes,
    remark
  };
  return axiosService({
    url: '/admin-api/role/add',
    method: 'post',
    data: params,
  });
}

/*
 * 角色查询
 */
export async function queryRole({roleName, page, limit}) {
  const params = {
    roleName,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api/role/list',
    method: 'post',
    data: params,
  });
}

/*
 * 权限下拉列表
 */
export async function permissionSelectList() {
  return axiosService({
    url: '/admin-api/role/permission-list',
    method: 'post'
  });
}

/*
 * 角色明细查询
 */
export async function queryRoleDetail(id) {
  return axiosService({
    url: '/admin-api/role/detail/'+id,
    method: 'post'
  });
}

/*
 * 角色信息修改
 */
export async function editRoleInfo({id, roleName, permissionCodes, remark}) {
  const params = {
    id,
    roleName,
    permissionCodes,
    remark
  };
  return axiosService({
    url: '/admin-api/role/update',
    method: 'post',
    data: params
  })
}

/*
 * 删除角色
 */
export async function delRole(id) {
  return axiosService({
    url: '/admin-api/role/remove/'+id,
    method: 'post'
  });
}

export default {
  queryRole,
  addRole,
  permissionSelectList,
  queryRoleDetail,
  editRoleInfo,
  delRole
}
