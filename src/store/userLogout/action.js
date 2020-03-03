/*
 * userLogout actions
 */

import {push} from 'react-router-redux';
import {Message} from '@alifd/next';
import {logout} from '../../api/index'

import {setAuthority} from '../../utils/authority';
import {reloadAuthorized} from '../../utils/Authorized';

import {
  USER_LOGOUT_REQUEST,
  // USER_LOGOUT_FAILURE,
  // USER_LOGOUT_SUCCESS,
} from './constants';

const userLogoutRequest = () => {
  return {
    type: USER_LOGOUT_REQUEST,
    isLoading: true,
  };
};

/*const userLogoutSuccess = (payload) => {
  return {
    type: USER_LOGOUT_FAILURE,
    isLoading: false,
    payload,
  };
};

const userLogoutFailure = (payload) => {
  return {
    type: USER_LOGOUT_SUCCESS,
    isLoading: false,
    payload,
  };
};*/

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(userLogoutRequest());
    logout().then((res) => {
      if (res.data.code === "200" && res.data.success) {
        // Message.success(res.data.message);
        setAuthority("[]");
        reloadAuthorized();
        dispatch(push('/user/login'));
      } else {
        Message.error(res.data.message);
      }
    })
  };
};
