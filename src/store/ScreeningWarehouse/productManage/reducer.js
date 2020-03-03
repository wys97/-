import * as constants from "./constants";
const stateInit = {
  clientManage: {
    //贷款业务管理-客户管理-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  
};
export default (state = stateInit, action) => {
  //贷款业务管理-客户管理-页面数据修改
  if (action.type === constants.CLIENT_FORMVALUE) {
    return Object.assign({}, state, {
      clientManage: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }


  if (action.type === constants.INIT_IALIZE) {
    if (action.path == "/baseinfo/customer") {
      //客户管理-页面数据-初始化
      return Object.assign({}, state, {
        clientManage: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    
  }
  return state;
};
