/* 首页相关接口 */
import axiosService from "../axios";

/*
 * 汇总信息查询
 */
export async function collect() {
  return axiosService({
    url: '/admin-api/home/collect',
    method: 'post'
  })
}

/*
 * 待办事项查询
 */
export async function todoList() {
  return axiosService({
    url: '/admin-api/home/to-do-list',
    method: 'post'
  })
}

/*
 * 项目资金规模信息查询
 */
export async function projectFundSize() {
  return axiosService({
    url: '/admin-api/home/project-capital-scale',
    method: 'post'
  })
}

/*
 * 运营情况地图信息查询
 */
export async function queryMap() {
  return axiosService({
    url: '/admin-api/home/china-map-data',
    method: 'post'
  })
}

/*
 * 运营情况数据列表查询
 */
export async function queryList(endTime) {
  return axiosService({
    url: '/admin-api/home/china-map-right-data/' + endTime,
    method: 'post'
  })
}

/*
 * 走势图查询
 */
export async function trendChart({queryType, dateType}) {
  const params = {
    queryType,
    dateType
  }
  return axiosService({
    url: '/admin-api/home/trend-data',
    method: 'post',
    data: params
  })
}

/*
 * 合作机构占比查询
 */
export async function queryPartnerRate(graphType) {
  return axiosService({
    url: '/admin-api/home/partner-scale-data/' + graphType,
    method: 'post'
  })
}

/*
 * 贷款产品放款Top10
 */
export async function topTen() {
  return axiosService({
    url: '/admin-api/home/product-loan-top',
    method: 'post'
  })
}

export default {
  collect,
  todoList,
  projectFundSize,
  queryMap,
  queryList,
  trendChart,
  queryPartnerRate,
  topTen
}
