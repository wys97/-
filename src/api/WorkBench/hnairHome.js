/* 首页相关接口 */
import axiosService from "../axios";

/*
 * 汇总信息查询
 */
export async function collect() {
    return axiosService({
        url: '/admin-api-hnair/home/collect',
        method: 'post'
    })
}

/*
 * 待办事项查询
 */
export async function todoList() {
    return axiosService({
        url: '/admin-api-hnair/home/to-do-list',
        method: 'post'
    })
}

/*
 * 今日情况
 */
export async function todaySituation() {
    return axiosService({
        url: '/admin-api-hnair/home/today-situation',
        method: 'post'
    })
}




/*
 * 走势图查询
 */
export async function trendChart({ queryType, dateType }) {
    const params = {
        queryType,
        dateType
    }
    return axiosService({
        url: '/admin-api-hnair/home/trend-data',
        method: 'post',
        data: params
    })
}




export default {
    collect,
    todoList,
    trendChart,
    todaySituation
}