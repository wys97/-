import * as constants from "./constants";
const stateInit = {
  collectionPoints: {
    //催收管理-催收分案-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  collectionTask: {
    //催收管理-我的催收任务-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  collectionUsersList: {
    //催收管理-催收用户记录-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  collectionHistory: {
    //催收管理-历史催收记录-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  collectionPayment: {
    //催收管理-催收还款记录-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
};
export default (state = stateInit, action) => {
  //催收管理-催收分案-页面数据修改
  if (action.type === constants.COLLECTION_POINTS) {
    return Object.assign({}, state, {
      collectionPoints: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //催收管理-我的催收任务-页面数据修改
  if (action.type === constants.COLLECTION_TASK) {
    return Object.assign({}, state, {
      collectionTask: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
//催收管理-催收用户记录-页面数据修改
if (action.type === constants.COLLECTION_USERSLIST) {
  return Object.assign({}, state, {
    collectionUsersList: {
      formValue: action.value.formValue,
      page: action.value.page,
      limit: action.value.limit
    }
  });
}
//催收管理-历史催收记录-页面数据修改
if (action.type === constants.COLLECTION_HISTORY) {
  return Object.assign({}, state, {
    collectionHistory: {
      formValue: action.value.formValue,
      page: action.value.page,
      limit: action.value.limit
    }
  });
}
//催收管理-历史催收记录-页面数据修改
if (action.type === constants.COLLECTION_PAYMENT) {
  return Object.assign({}, state, {
    collectionPayment: {
      formValue: action.value.formValue,
      page: action.value.page,
      limit: action.value.limit
    }
  });
}

  if (action.type === constants.COLLECTION_INITIALIZE) {
    if (action.path == "/collectionManage/collectionManage") {
      //催收分案-页面数据-初始化
      return Object.assign({}, state, {
        collectionPoints: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/collectionManage/CollectionTask") {
      //我的催收任务-页面数据-初始化
      return Object.assign({}, state, {
        collectionTask: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/collectionManage/CollectionUsersList") {
      //催收用户记录-页面数据-初始化
      return Object.assign({}, state, {
        collectionUsersList: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/collectionManage/CollectionHistory") {
      //历史催收记录-页面数据-初始化
      return Object.assign({}, state, {
        collectionHistory: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/collectionManage/CollectionPayment") {
      //催收还款记录-页面数据-初始化
      return Object.assign({}, state, {
        collectionPayment: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
  }
  return state;
};
