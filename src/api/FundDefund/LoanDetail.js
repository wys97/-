/* 放款对账相关接口 */
import axiosService from "../axios";

/*
 * 对账状态查询
 */
export async function checkStatus() {
    return axiosService({
        url: '/admin-api/common/check-status',
        method: 'post'
    })
}

/*
 * 放款对账明细查询
 */
export async function checkPayList({ checkId, checkDate, payProviderCode, checkStatus, page, limit }) {
    let checkDateBegin = '';
    let checkDateEnd = '';
    if (checkDate && checkDate.length > 0) {
        checkDate.map((item, index) => {
            if (index) {
                checkDateEnd = new Date(item).Format('yyyy-MM-dd');
            } else {
                checkDateBegin = new Date(item).Format('yyyy-MM-dd');
            }
        })
    }
    const params = {
        checkId,
        checkDateBegin,
        checkDateEnd,
        checkStatus,
        payProviderCode,
        page,
        limit
    };
    return axiosService({
        url: '/admin-api/check-pay/list',
        method: 'post',
        data: params,
    });
}

/*
 * 放款明细详情查询
 */
export async function checkPayDetail(id) {
    return axiosService({
        url: '/admin-api/check-pay/detail/' + id,
        method: 'post'
    });
}


/*
 * 重新发起
 */
export async function checkPayAgain(id) {
    return axiosService({
        url: '/admin-api/check-pay/check-again/' + id,
        method: 'post'
    });
}


/*
 *  下载
 */
export async function checkPayDownload(id) {
    return axiosService({
        url: '/admin-api/check-pay/download/' + id,
        method: 'post',
        responseType: 'blob',
    });
}


/*
 *  勾兑状态
 */
export async function checkPayBlendStatus(id) {
    return axiosService({
        url: '/admin-api/check-pay/blend-status/' + id,
        method: 'post'
    });
}


/*
 *  勾兑日期
 */
export async function checkPayBlendDate(id) {
    return axiosService({
        url: '/admin-api/check-pay/blend-date/' + id,
        method: 'post'
    });
}



export default {
    checkPayList,
    checkStatus,
    checkPayDetail,
    checkPayAgain,
    checkPayDownload,
    checkPayBlendStatus,
    checkPayBlendDate
}

Date.prototype.Format = function(fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
