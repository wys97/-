/* 日终结算相关接口 */
import axiosService from "../axios";


/*
 * 日终结算-发送明细
 */
export async function finaceSettleSend(id) {
    const params = {
        id
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/send',
        method: 'post',
        data: params
    })
}


/*
 * 日终结算-打款指令
 */
export async function finaceSettlePay(id) {
    const params = {
        id
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/pay',
        method: 'post',
        data: params
    })
}

/*
 * 日终结算-结果查询
 */
export async function finaceSettlePayResult(id) {
    const params = {
        id
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/payResult',
        method: 'post',
        data: params
    })
}





/*
 * 日终结算-列表查询
 */
export async function finaceSettleList({ settleStatus, settleDate, sendStatus, productName, page, limit }) {
    const params = {
        settleStatus,
        settleDate: settleDate && settleDate._d ? new Date(settleDate._d).Format('yyyy-MM-dd') : '',
        sendStatus,
        productName,
        page,
        limit
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/list',
        method: 'post',
        data: params
    })
}


/*
 * 日终结算-退款列表
 */
export async function finaceSettleListRefund({ settleDate, id, page, limit }) {
    const params = {
        settleDate,
        id,
        page,
        limit
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/listRefund',
        method: 'post',
        data: params
    })
}


/*
 * 日终结算-放款列表分页查询
 */
export async function finaceSettleListLoan({ settleDate, id, page, limit }) {
    const params = {
        settleDate,
        id,
        page,
        limit
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/listLoan',
        method: 'post',
        data: params
    })
}

/*
 * 日终结算-发送状态
 */
export async function listSendStatus() {
    return axiosService({
        url: '/admin-api-hnair/finace-settle/listSendStatus',
        method: 'get',
    })
}


/*
 * 日终结算-结算状态
 */
export async function listSettleStatus() {
    return axiosService({
        url: '/admin-api-hnair/finace-settle/listSettleStatus',
        method: 'get',
    })
}

/*
 * 日终结算-详情页面
 */
export async function finaceSettleRead(id) {
    const params = {
        id
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/read',
        method: 'post',
        data: params
    })
}


/*
 * 日终结算-列表导出
 */
export async function downsettlePartner({ settleStatus, settleDate, sendStatus, productName }) {
    const params = {
        settleStatus: settleStatus ? settleStatus : '',
        settleDate: settleDate && settleDate._d ? new Date(settleDate._d).Format('yyyy-MM-dd') : '',
        sendStatus: sendStatus ? sendStatus : '',
        productName: productName ? productName : '',
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/downsettlePartner',
        method: 'post',
        data: params,
        responseType: 'blob'
    })
}


/*
 * 日终结算放款明细导出
 */
export async function downLoanRecord({ id, settleDate }) {
    const params = {
        id,
        settleDate
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/downLoanRecord?id=' + params.id + '&settleDate=' + params.settleDate + '',
        method: 'get',
    })
}


/*
 * 日终结算-退款明细列表导出
 */
export async function downRefundRecord({ id, settleDate }) {
    const params = {
        id,
        settleDate
    }
    return axiosService({
        url: '/admin-api-hnair/finace-settle/downRefundRecord?id=' + params.id + '&settleDate=' + params.settleDate + '',
        method: 'get',
    })
}

/*
 * 日终结算-自动打款设置-开关状态
 */
export async function finaceEnabledDisabled() {
    return axiosService({
        url: '/admin-api-hnair/finace-settle/enabled-disabled',
        method: 'post',
    })
}

/*
 * 日终结算-自动打款设置-详情
 */
export async function finaceAutoPayDetail() {
    return axiosService({
        url: '/admin-api-hnair/finace-settle/auto-pay/detail',
        method: 'post',
    })
}

/*
 * 日终结算-自动打款设置-修改
 */
export async function finaceAutoPayUpdate(params) {
    return axiosService({
        url: '/admin-api-hnair/finace-settle/auto-pay/update',
        method: 'post',
        data: params
    })
}



export default {
    finaceSettleList,
    finaceSettlePay,
    finaceSettlePayResult,
    finaceSettleListRefund,
    finaceSettleListLoan,
    listSendStatus,
    listSettleStatus,
    finaceSettleRead,
    finaceSettleSend,
    downsettlePartner,
    downLoanRecord,
    downRefundRecord,
    finaceEnabledDisabled,
    finaceAutoPayDetail,
    finaceAutoPayUpdate
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
