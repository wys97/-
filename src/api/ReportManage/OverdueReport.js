import axiosService from "../axios";

// 逾期变化趋势 - 柱状图数据
export async function trend(date) {
  let dateBegin = '';
  let dateEnd = '';
  if (date && date.length > 0) {
    date.map((item, index) => {
      if (index) {
        dateEnd = new Date(item).Format('yyyy-MM-dd');
      } else {
        dateBegin = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    dateEnd,
    dateBegin
  }
  return axiosService({
    url: '/admin-api/overdue-report/change-trend',
    method: 'post',
    data:params
  });
}

// 逾期列表 - 入催率
export async function pushRate(date) {
  let dateBegin = '';
  let dateEnd = '';
  if (date && date.length > 0) {
    date.map((item, index) => {
      if (index) {
        dateEnd = new Date(item).Format('yyyy-MM-dd');
      } else {
        dateBegin = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    dateEnd,
    dateBegin
  }
  return axiosService({
    url: '/admin-api/overdue-report/push-rate',
    method: 'post',
    data: params
  });
}

// 逾期列表 - 首期逾期率
export async function firstPeriodRate(date) {
  let dateBegin = '';
  let dateEnd = '';
  if (date && date.length > 0) {
    date.map((item, index) => {
      if (index) {
        dateEnd = new Date(item).Format('yyyy-MM-dd');
      } else {
        dateBegin = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    dateEnd,
    dateBegin
  }
  return axiosService({
    url: '/admin-api/overdue-report/first-period-rate',
    method: 'post',
    data: params
  });
}

// 逾期列表 - 各阶段逾期分布
export async function stageStatistics() {
  return axiosService({
    url: '/admin-api/overdue-report/stage-statistics',
    method: 'post',
  });
}

// 导出
export async function exportExcel(data) {
  return axiosService({
    url: '/admin-api/overdue-report/export-data',
    method: 'post',
    data,
    responseType: 'blob'
  });
}

export default {
  trend,
  pushRate,
  firstPeriodRate,
  stageStatistics,
  exportExcel
};
Date.prototype.Format = function (fmt) {
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
};
