/* 问题管理 */
import axiosService from "../axios";


// 问题管理 - 列表
export async function list
(
  {
    id,
    questionTitle,
    page,
    limit
  }
) {

  const params = {
    id,
    questionTitle,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/app-question/list",
    method: "post",
    data: params
  });
}


// 问题管理-删除
export async function del(id) {
  return axiosService({
    url: "/admin-api-hnair/app-question/remove/" + id,
    method: "post"
  });
}

// 问题管理-查看详情
export async function get(id) {
  return axiosService({
    url: "/admin-api-hnair/app-question/get/" + id,
    method: "get"
  });
}

// 问题管理-新增
export async function add
(
  {
    id,
    questionTitle,
    questionContent
  }
) {

  const params = {
    id,
    questionTitle,
    questionContent
  };
  return axiosService({
    url: "/admin-api-hnair/app-question/add",
    method: "post",
    data: params
  });
}


// 问题管理-修改
export async function update
(
  {
    id,
    questionTitle,
    questionContent
  }
) {

  const params = {
    id,
    questionTitle,
    questionContent
  };
  return axiosService({
    url: "/admin-api-hnair/app-question/update",
    method: "post",
    data: params
  });
}


export default {
  add,
  list,
  del,
  get,
  update
}
