/* 密码校验规则-接口 */
import axiosService from "../axios";

// 密码校验规则-列表
export async function PasswordValidList() {
    return axiosService({
        url: '/admin-api/password-valid/list',
        method: 'post'
    });
}

// 启用
export async function PasswordValidEnable(id) {
    return axiosService({
        url: '/admin-api/password-valid/enable/' + id,
        method: 'post',
    });
}

// 停用
export async function PasswordValidDisable(id) {
    return axiosService({
        url: '/admin-api/password-valid/disable/' + id,
        method: 'post',
    });
}


// 保存
export async function PasswordValidSave({ id, value }) {
    const params = {
        id,
        value
    }
    return axiosService({
        url: '/admin-api/password-valid/save',
        method: 'post',
        data: params
    });
}


export default {
    PasswordValidList,
    PasswordValidDisable,
    PasswordValidSave,
    PasswordValidEnable
}