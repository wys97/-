/* 我的催收任务相关接口 */
import axiosService from "../axios";

/*
 * 我的催收任务列表
 */
export async function taskList({
  customerName,
  customerPhone,
  customerIdentifyNo,
  collectionStatus,
  page,
  limit
}) {
  const params = {
    customerName,
    customerPhone,
    customerIdentifyNo,
    collectionStatus,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api/collection/task/list",
    method: "post",
    data: params
  });
}

/*
 * 催收状态下拉
 */
export async function listCollectionStatusEnum() {
  return axiosService({
    url: "/admin-api/collection/distribution/listCollectionStatusEnum",
    method: "post"
  });
}

/**
 * 催收任务新增
 */
export async function addRecord(data) {
  return axiosService({
    url: "/admin-api/collection/task/addRecord",
    method: "post",
    data
  });
}

/**
 * 催收任务修改-详情
 */
export async function taskDetail(collectionTaskId) {
  return axiosService({
    url: "/admin-api/collection/task/detail/" + collectionTaskId,
    method: "post",
  });
}



/**
 * 催收任务修改-保存
 */
export async function updateCollectionRemark(data) {
  return axiosService({
    url: "/admin-api/collection/task/updateCollectionRemark",
    method: "post",
    data
  });
}

/**
 * 催收任务新增-联系人信息
 */
export async function getMobile(customerId) {
  return axiosService({
    url: "/admin-api/collection/task/get-mobile/" + customerId,
    method: "post",
  });
}

/**
 * 催收任务新增-联系人邮箱
 */
export async function getMail(customerId) {
  return axiosService({
    url: "/admin-api/collection/task/get-mail/" + customerId,
    method: "post",
  });
}

/**
 * 催收任务新增-模板信息
 */
export async function getTemplate(data) {
  return axiosService({
    url: "/admin-api/collection/task/get-template",
    method: "post",
    data
  });
}


export default {
  taskList,
  listCollectionStatusEnum,
  addRecord,
  taskDetail,
  getMobile, 
  getMail,
  getTemplate,
  updateCollectionRemark,
};
