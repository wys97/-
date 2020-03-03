/* 定时任务管理页面相关接口 */
import axiosService from '../axios';

export async function queryTimingTask() {
  return axiosService({
    url: '/admin-api/batch-profile/list',
    method: 'post'
  })
}

export default {
  queryTimingTask
}
