import axiosService from "../axios";

// 授信统计
export async function statistics(data) {
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
    dateEnd,
    dateBegin,
    dateType:data.dateType,
    productNo:data.productNo
  }
  return axiosService({
    url: '/admin-api/credit-report/credit-statistics',
    method: 'post',
    data: params
  });
}

// 授信额度分布
export async function creditLlimit() {
  return axiosService({
    url: '/admin-api/credit-report/credit-limit',
    method: 'post'
  });
}


// 产品下拉菜单
export async function productList() {
  return axiosService({
    url: '/admin-api/repay-report/product-list',
    method: 'post'
  });
}

export default {
  statistics,
  creditLlimit,
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
