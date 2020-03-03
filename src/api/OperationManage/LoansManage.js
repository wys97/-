/* 查询贷款信息 */
import axiosService from "../axios";

export async function loansManage(params) {
  return axiosService({
        url: '/admin-api/project/list',
        method: 'post',
        data: params,
    });
}

//贷款项目管理-项目状态-下拉
export async function projectStatus() {
  return axiosService({
        url: '/admin-api/project/project-status',
        method: 'post',
    });
}


//贷款项目管理-期限单位-下拉
export async function projectTermUnit() {
  return axiosService({
        url: '/admin-api/project/project-term-unit',
        method: 'post',
    });
}

//贷款项目管理-合作机构-下拉
export async function projectPartnerInfo() {
  return axiosService({
		url: '/admin-api/common/partner-info',
		method: 'post',
	});
}

//贷款项目管理-冻结
export async function projectDisabled(id) {
  return axiosService({
        url: '/admin-api/project/disabled/' + id,
        method: 'post',
    });
}

//贷款项目管理-结束
export async function projectEnd(id) {
  return axiosService({
        url: '/admin-api/project/ended/' + id,
        method: 'post',
    });
}

// 贷款项目删除
export async function projectDelete(id) {
  return axiosService({
    url: '/admin-api/project/delete/' + id,
    method: 'post'
  });
}

//贷款项目管理-新增
export async function projectAdd(params) {
  return axiosService({
        url: '/admin-api/project/add',
        method: 'post',
        data: params,
    });
}

// 贷款项目管理-详情
export async function projectDetail(id) {
  return axiosService({
		url: '/admin-api/project/detail/' + id,
		method: 'post',
	});
}

// 贷款项目管理-修改
export async function projectUpdate(params) {
  return axiosService({
		url: '/admin-api/project/update',
		method: 'post',
		data: params
	});
}

export default {
    loansManage,
    projectStatus,
    projectTermUnit,
    projectPartnerInfo,
    projectDisabled,
    projectEnd,
    projectDelete,
    projectAdd,
    projectDetail,
    projectUpdate
}
