import * as constants from "./constants";

/**
 * 生成 COLLECTION_POINTS 动作的函数
 * @param {String} value 催收分案-筛查参数与页码 
 */
export const collectionPoints = value => {
  return {
    type: constants.COLLECTION_POINTS,
    value
  }
}

/**
 * 生成 COLLECTION_TASK 动作的函数
 * @param {String} value 我的催收任务-筛查参数与页码 
 */
export const collectionTask = value => {
  return {
    type: constants.COLLECTION_TASK,
    value
  }
}

/**
 * 生成 COLLECTION_USERSLIST 动作的函数
 * @param {String} value 催收用户记录-筛查参数与页码 
 */
export const collectionUsersList = value => {
  return {
    type: constants.COLLECTION_USERSLIST,
    value
  }
}

/**
 * 生成 COLLECTION_HISTORY 动作的函数
 * @param {String} value 历史催收记录-筛查参数与页码 
 */
export const collectionHistory = value => {
  return {
    type: constants.COLLECTION_HISTORY,
    value
  }
}

/**
 * 生成 COLLECTION_PAYMENT 动作的函数
 * @param {String} value 催收还款记录-筛查参数与页码 
 */
export const collectionPayment = value => {
  return {
    type: constants.COLLECTION_PAYMENT,
    value
  }
}

/**
 * 生成 COLLECTION_INITIALIZE 动作的函数
 * @param {String} value 初始化创库-筛查参数与页码 
 */
export const collectionInitialization = path => {
  return {
    type: constants.COLLECTION_INITIALIZE,
    path
  }
}
