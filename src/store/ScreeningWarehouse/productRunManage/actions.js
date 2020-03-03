import * as constants from "./constants";

/**
 * 生成 PEODUCT_MANAGE 动作的函数
 * @param {String} value 产品管理-筛查参数与页码 
 */
export const productManage = value => {
  return {
    type: constants.PEODUCT_MANAGE,
    value
  }
}

/**
 * 生成 OPERATIONS_MANAGE 动作的函数
 * @param {String} value 运营管理-筛查参数与页码 
 */
export const operationsManage = value => {
  return {
    type: constants.OPERATIONS_MANAGE,
    value
  }
}

/**
 * 生成 PARTNERS_MANAGE 动作的函数
 * @param {String} value 合作机构管理-筛查参数与页码 
 */
export const partnersManage = value => {
  return {
    type: constants.PARTNERS_MANAGE,
    value
  }
}

/**
 * 生成 EXCEPT_LOG 动作的函数
 * @param {String} value 批量日志查询-筛查参数与页码 
 */
export const exceptLog = value => {
  return {
    type: constants.EXCEPT_LOG,
    value
  }
}

/**
 * 生成 PEODUCTRUN_MANAGE 动作的函数
 * @param {String} value 初始化创库-筛查参数与页码 
 */
export const productRunManage = path => {
  return {
    type: constants.PEODUCTRUN_MANAGE,
    path
  }
}
