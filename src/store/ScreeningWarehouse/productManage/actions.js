import * as constants from "./constants";

/**
 * 生成 CLIENT_FORMVALUE 动作的函数
 * @param {String} value 客户管理-筛查参数与页码 
 */
export const clientFormValue = value => {
  return {
    type: constants.CLIENT_FORMVALUE,
    value
  }
}


/**
 * 生成 INIT_IALIZE 动作的函数
 * @param {String} value 初始化创库-筛查参数与页码 
 */
export const initialize = path => {
  return {
    type: constants.INIT_IALIZE,
    path
  }
}
