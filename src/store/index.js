import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

// 引入拆分出去的 reducer
import loanTransactionReducer from "./ScreeningWarehouse/loanTransaction/reducer";
import productManageReducer from "./ScreeningWarehouse/productManage/reducer";
import approvalManagementReducer from "./ScreeningWarehouse/approvalManagement/reducer";
import collectionManageReducer from "./ScreeningWarehouse/collectionManage/reducer";
import productRunManageReducer from "./ScreeningWarehouse/productRunManage/reducer";

const composeEnxxx = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combineReducers1 = obj => {
  return (state = {}, action) => {
    let res = {};
    for (let key in obj) {
      res[key] = obj[key](state[key], action);
    }
    return res;
  };
};

export default createStore(
  combineReducers1({
    // key - 模块名
    // key: value
    loanTransaction: loanTransactionReducer,
    productManage: productManageReducer,
    approvalManagement: approvalManagementReducer,
    collectionManage: collectionManageReducer,
    productRunManage: productRunManageReducer,

  }),
  composeEnxxx(applyMiddleware(thunk))
);

