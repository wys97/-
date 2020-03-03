/**
 * 通过 mock api 的形式模拟实际项目中的接口
 * 可通过 mock/index.js 模拟数据，类似 express 的接口
 * 参考： https://alibaba.github.io/ice/docs/pro/mock
 */
// import axios from 'axios';
import axiosService from './axios';

export async function login(params) {
  return axiosService({
    url: '/admin-api/login',
    method: 'post',
    data: params,
  });
}

export async function logout() {
  return axiosService({
    url: '/admin-api/logout',
    method: 'post'
  })
}

export async function postUserRegister(params) {
  return axiosService({
    url: '/api/register',
    method: 'post',
    data: params,
  });
}

export async function postUserLogout() {
  return axiosService({
    url: '/api/logout',
    method: 'post',
  });
}

export async function getUserProfile() {
  return axiosService({
    url: '/admin-api/current-opeartor',
    method: 'post',
  });
}

export async function getCaptcha() {
  return axiosService({
    url: 'admin-api/login/captcha',
    responseType: 'arraybuffer',
    method: 'post',
  })
}

export async function changePwd({oldPassword, newPassword}) {
  const params = {
    oldPassword,
    newPassword
  }
  return axiosService({
    url: '/admin-api/update-login-password',
    method: 'post',
    data: params
  })
}

export default {
  login,
  logout,
  postUserRegister,
  postUserLogout,
  getUserProfile,
  getCaptcha,
  changePwd
};
