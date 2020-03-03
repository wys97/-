/*
 * profile actions
 */

import {
    USER_PROFILE_REQUEST,
    USER_PROFILE_FAILURE,
    USER_PROFILE_SUCCESS,
} from './constants';
import { getUserProfile } from '../../api';
// import { setAuthority } from '../../utils/authority';
// import { reloadAuthorized } from '../../utils/Authorized';
// import { Message } from "@alifd/next";
import { push } from "react-router-redux";

let userInfo = {};

const userProfileRequest = () => {
    return {
        type: USER_PROFILE_REQUEST,
        isLoading: true,
    };
};

const userProfileSuccess = (payload) => {
    userInfo = payload;
    return {
        type: USER_PROFILE_FAILURE,
        isLoading: false,
        payload,
    };
};

/*const userProfileFailure = (payload) => {
    return {
        type: USER_PROFILE_SUCCESS,
        isLoading: false,
        payload,
    };
};*/

export const userProfile = () => {
    return async(dispatch) => {
        dispatch(userProfileRequest());
        getUserProfile().then((res) => {
            if (res.data.code === "200" && res.data.success) {
                dispatch(userProfileSuccess(res.data));
                // Message.success(res.data.message);
                dispatch(push('/myWorkspace/home'));
            } else {
                dispatch(push('/user/login'));
            }
        })
    };
};

/*export const getUserInfo = () => {
    return userInfo;
};*/
