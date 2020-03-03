/* 放款明细相关接口 */
import axiosService from "../axios";

/*
 * 放款状态查询
 */
export async function queryLoanStatus() {
    return axiosService({
        url: '/admin-api/loan-pay/loan-status',
        method: 'post'
    })
}

/*
 * 放款明细查询
 */
export async function queryLoanList({ loanPayNo, dueId, customerName, identityNo, phone, partnerName, productName, status, loanDate, page, limit }) {
    let beginDate = '';
    let endDate = '';
    if (loanDate && loanDate.length > 0) {
        loanDate.map((item, index) => {
            if (index) {
                endDate = new Date(item).Format('yyyy-MM-dd');
            } else {
                beginDate = new Date(item).Format('yyyy-MM-dd');
            }
        })
    }
    const params = {
        loanPayNo,
        dueId,
        customerName,
        identityNo,
        phone,
        partnerName,
        productName,
        status,
        beginDate,
        endDate,
        page,
        limit
    };
    return axiosService({
        url: '/admin-api/loan-pay/list',
        method: 'post',
        data: params,
    });
}

/*
 * 放款明细详情查询
 */
export async function queryLoanDetail(id) {
    return axiosService({
        url: '/admin-api/loan-pay/detail//' + id,
        method: 'post'
    });
}

export default {
    queryLoanStatus,
    queryLoanList,
    queryLoanDetail
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
