/* 查询筛查规则管理信息 */
import axiosService from "../axios";

export async function searchRuleList(params) {
  return axiosService({
        url: '/admin-api/check-rule/list',
        method: 'post',
        data: params
    });
}

export default {
	searchRuleList
}
