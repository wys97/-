/* 黑名单管理信息 */
import axiosService from "../axios";

// 列表
export async function list(data) {
  return axiosService({
    url: '/admin-api/blacklist/list',
    method: 'post',
    data
  });
}

// 新增
export async function add(data) {
  return axiosService({
    url: '/admin-api/blacklist/add',
    method: 'post',
    data
  });
}

// 修改
export async function update(data) {
  return axiosService({
    url: '/admin-api/blacklist/update',
    method: 'post',
    data
  });
}

// 删除
export async function remove(id) {
  return axiosService({
    url: '/admin-api/blacklist/delete/' + id,
    method: 'post'
  });
}

// 详情
export async function detail(id) {
  return axiosService({
    url: '/admin-api/blacklist/detail/' + id,
    method: 'post'
  });
}

// 进入
export async function goin(data) {
  return axiosService({
    url: '/admin-api/blacklist/in-apply',
    method: 'post',
    data
  })
}

// 移出
export async function goout(data) {
  return axiosService({
    url: '/admin-api/blacklist/out-apply',
    method: 'post',
    data
  });
}

// 生效标志
export async function validStatus() {
  return axiosService({
    url: '/admin-api/blacklist/valid-status',
    method: 'post'
  });
}

// 黑名单状态
export async function blackStatus() {
  return axiosService({
    url: '/admin-api/blacklist/black-status',
    method: 'post'
  });
}

// 数据来源
export async function blackSource() {
  return axiosService({
    url: '/admin-api/blacklist/black-source',
    method: 'post'
  });
}

// 导出
export async function exportExcel(data) {
  return axiosService({
    url: '/admin-api/blacklist/black-template-download',
    method: 'post',
    data,
    responseType: 'blob'
  });
}

export default {
  list,
  add,
  update,
  remove,
  detail,
  goin,
  goout,
  validStatus,
  blackStatus,
  blackSource,
  exportExcel
}
