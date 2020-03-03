/* 任务执行监控页面相关接口 */
import axiosService from '../axios';

export async function queryTask({batchId, taskCode, date, taskStatus, page, limit}) {
  let beginDate = '';
  let endDate = '';
  if (date && date.length > 0) {
    date.map((item, index) => {
      if (index) {
        endDate = new Date(item).Format('yyyy-MM-dd');
      } else {
        beginDate = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    batchId,
    taskCode,
    beginDate,
    endDate,
    taskStatus,
    page,
    limit
  }
  return axiosService({
    url: '/admin-api/system-batch/list',
    method: 'post',
    data: params
  })
}

export async function taskDetail(batchId) {
  return axiosService({
    url: '/admin-api/system-batch/detail/' + batchId,
    method: 'post'
  })
}

export async function executeStatus() {
  return axiosService({
    url: '/admin-api/system-batch/status',
    method: 'post'
  })
}

export default {
  queryTask,
  taskDetail,
  executeStatus
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
