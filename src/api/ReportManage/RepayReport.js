import axiosService from "../axios";

// 还款统计 - 柱状图数据
export async function trend(data) {
  let dateBegin = '';
  let dateEnd = '';
  if (data.date && data.date.length > 0) {
    data.date.map((item, index) => {
      if (index) {
        dateEnd = new Date(item).Format('yyyy-MM-dd');
      } else {
        dateBegin = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    productNo: data.productNo,
    dateType: data.dateType,
    dateEnd,
    dateBegin
  }
  return axiosService({
    url: '/admin-api/repay-report/repay-statistics',
    method: 'post',
    data: params
  });
}

// 还款统计图 - 产品下拉菜单
export async function productList() {
  return axiosService({
    url: '/admin-api/repay-report/product-list',
    method: 'post'
  });
}

// 未来待还统计
export async function reportData(data) {
  let dateBegin = '';
  let dateEnd = '';
  if (data.date && data.date.length > 0) {
    data.date.map((item, index) => {
      if (index) {
        dateEnd = new Date(item).Format('yyyy-MM-dd');
      } else {
        dateBegin = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    productNo: data.productNo,
    dateType: data.dateType,
    dateEnd,
    dateBegin
  }
  return axiosService({
    url: '/admin-api/repay-report/need-repay-statistics',
    method: 'post',
    data: params
  });
}


export default {
  trend,
  reportData,
  productList
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
