import * as constants from "./constants";
const stateInit = {
  productManage: {
    //产品管理-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  operationsManage: {
    //运营管理-贷款业务管理-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  partnersManage: {
    //运营管理-合作机构管理-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  exceptLog: {
    //运营管理-批量日志查询-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  }
};
export default (state = stateInit, action) => {
  //产品管理-页面数据修改
  if (action.type === constants.PEODUCT_MANAGE) {
    return Object.assign({}, state, {
      productManage: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //运营管理-贷款项目管理-页面数据修改
  if (action.type === constants.OPERATIONS_MANAGE) {
    return Object.assign({}, state, {
      operationsManage: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //运营管理-合作机构管理-页面数据修改
  if (action.type === constants.PARTNERS_MANAGE) {
    return Object.assign({}, state, {
      partnersManage: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //运营管理-批量日志查询-页面数据修改
  if (action.type === constants.EXCEPT_LOG) {
    return Object.assign({}, state, {
      exceptLog: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }

  if (action.type === constants.PEODUCTRUN_MANAGE) {
    if (action.path == "/baseinfo/product") {
      //产品管理-页面数据-初始化
      return Object.assign({}, state, {
        productManage: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/baseinfo/loans") {
      //运营管理-贷款项目管理-页面数据-初始化
      return Object.assign({}, state, {
        operationsManage: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/baseinfo/partners") {
      //运营管理-合作机构管理-页面数据-初始化
      return Object.assign({}, state, {
        partnersManage: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/log/exceptLog") {
      //运营管理-批量日志查询-页面数据-初始化
      return Object.assign({}, state, {
        exceptLog: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
  }
  return state;
};
