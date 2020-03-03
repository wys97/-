/* 批量日志查询页面相关接口 */
import axiosService from '../axios';

export async function queryExceptLog({logId, taskCode, taskName, orderId, batchDate, page, limit}) {
  const params = {
    logId,
    taskCode,
    taskName,
    orderId,
    batchDate: batchDate && batchDate._d ? new Date(batchDate._d).Format('yyyy-MM-dd') : '',
    page,
    limit
  }
  return axiosService({
    url: '/admin-api/batch-log/list',
    method: 'post',
    data: params
  })
}

export async function exceptLogDetail(logId) {
  return axiosService({
    url: '/admin-api/batch-log/detail/' + logId,
    method: 'post'
  })
}

export default {
  queryExceptLog,
  exceptLogDetail
}

Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
