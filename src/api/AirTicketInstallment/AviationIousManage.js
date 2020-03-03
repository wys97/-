/* 航空白条相关接口 */
import axiosService from "../axios";

/*
 * 航空白条入口-列表
 */
export async function whiteStripList() {
    return axiosService({
        url: '/admin-api-hnair/white-strip/list',
        method: 'post'
    });
}


/*
 * 航空白条入口-详情
 */
export async function whiteStripListDetail(id) {
    return axiosService({
        url: '/admin-api-hnair/white-strip/detail/' + id,
        method: 'post'
    });
}

/*
 * 航空白条入口-修改
 */
export async function whiteStripListUpdate({ id, status, quota, remark }) {
    const params = {
        id,
        status,
        quota,
        remark
    }
    return axiosService({
        url: '/admin-api-hnair/white-strip/update',
        method: 'post',
        data: params,
    });
}

/*
 * 航空白条-启用
 */
export async function whiteStripListEnable(id) {
    return axiosService({
        url: '/admin-api-hnair/white-strip/enable/' + id,
        method: 'post'
    });
}

/*
 * 航空白条-停用
 */
export async function whiteStripListDisable(id) {
    return axiosService({
        url: '/admin-api-hnair/white-strip/disable/' + id,
        method: 'post'
    });
}

/*
 * 启用停用-下拉框
 */
export async function commonEnableDisable() {
    return axiosService({
        url: '/admin-api-hnair/common/enable-disable',
        method: 'post'
    });
}

export default {
    whiteStripList,
    whiteStripListDetail,
    whiteStripListUpdate,
    whiteStripListEnable,
    whiteStripListDisable,
    commonEnableDisable
}