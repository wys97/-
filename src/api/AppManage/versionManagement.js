/* 版本管理 */
import axiosService from "../axios";

// 版本管理-版本状态-下拉框
export async function versionStatus() {
  return axiosService({
    url: "/admin-api-hnair/app-version/versionStatusEnum",
    method: "post"
  });
}

// 版本管理-推送平台-下拉框
export async function platform() {
  return axiosService({
    url: "/admin-api-hnair/app-version/platformEnum",
    method: "post"
  });
}

// 版本管理 - 列表
export async function versionList({versionNo,platform,status,endedDate,page,limit}) {
  let beginDate = '';
	let endDate = '';
	if (endedDate && endedDate.length > 0) {
	    endedDate.map((item, index) => {
		    if (index) {
		    	endDate = new Date(item).Format('yyyy-MM-dd');
		    } else {
		    	beginDate = new Date(item).Format('yyyy-MM-dd');
		    }
		})
	}
	const params = {versionNo,platform,status,beginDate,endDate,page,limit}
  return axiosService({
    url: "/admin-api-hnair/app-version/list",
    method: "post",
    data: params
  });
}

// 版本管理-启用
export async function versionEnabled(id) {
  return axiosService({
    url: "/admin-api-hnair/app-version/enable/" + id,
    method: "post"
  });
}

// 版本管理-停用
export async function versionDisabled(id) {
  return axiosService({
    url: "/admin-api-hnair/app-version/disable/" + id,
    method: "post"
  });
}

// 版本管理-详情
export async function versionDetail(id) {
  return axiosService({
    url: "/admin-api-hnair/app-version/detail/" + id,
    method: "post"
  });
}

// 版本管理-修改
export async function versionUpdate({
    id,
    versionNo,
    platform,
    url,
    content
}) {
  const params = {
    id,
    versionNo,
    platform,
    url,
    content
  };
  return axiosService({
    url: "/admin-api-hnair/app-version/update",
    method: "post",
    data: params
  });
}

// 版本管理-新增
export async function versionInsert({
  versionNo,
  platform,
  url,
  content
}) {
  const params = {
    versionNo,
    platform,
    url,
    content
  };
  return axiosService({
    url: "/admin-api-hnair/app-version/insert",
    method: "post",
    data: params
  });
}

export default {
  versionStatus,
  platform,
  versionList,
  versionEnabled,
  versionDisabled,
  versionDetail,
  versionUpdate,
  versionInsert
}
