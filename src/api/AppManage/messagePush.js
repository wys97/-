/* 消息推送 */
import axiosService from "../axios";

// 消息推送-推送平台-下拉框
export async function platform() {
  return axiosService({
    url: "/admin-api-hnair/app-push/platformEnum",
    method: "post"
  });
}

// 消息推送-消息状态-下拉框
export async function messageStatus() {
  return axiosService({
    url: "/admin-api-hnair/app-push/statusEnum",
    method: "post"
  });
}

// 消息推送-发送类型-下拉框
export async function messageType() {
  return axiosService({
    url: "/admin-api-hnair/app-push/typeEnum",
    method: "post"
  });
}


// 消息推送 - 列表
export async function list({id,platform,title,sendStatus,sendType,endedDate,page,limit}) {
  let beginDate = '';
	let endDate = '';
	if (endedDate && endedDate.length > 0) {
	    endedDate.map((item, index) => {
		    if (index) {
		    	endDate = new Date(item).Format('yyyy-MM-dd');
		    } else {
		    	beginDate = new Date(item).Format('yyyy-MM-dd');
		    }
		})
	}
	const params = {id,platform,title,sendStatus,sendType,beginDate,endDate,page,limit}
  return axiosService({
    url: "/admin-api-hnair/app-push/list",
    method: "post",
    data: params
  });
}

// 消息推送-发送
export async function updateStatus(id) {
  return axiosService({
    url: "/admin-api-hnair/app-push/updateStatus/" + id,
    method: "post"
  });
}

// 消息推送-详情
export async function detail(id) {
  return axiosService({
    url: "/admin-api-hnair/app-push/detail/" + id,
    method: "post"
  });
}

// 消息推送-删除
export async function deleteMessage(id) {
  return axiosService({
    url: "/admin-api-hnair/app-push/delete/" + id,
    method: "post"
  });
}

// 消息推送-修改
export async function update({
    id,
    platform,
    title,
    content,
    sendTime,
    sendType
}) {
  const params = {
    id,
    platform,
    title,
    content,
    sendTime,
    sendType
  };
  return axiosService({
    url: "/admin-api-hnair/app-push/update",
    method: "post",
    data: params
  });
}

// 消息推送-新增
export async function insert({
  platform,
  title,
  content,
  sendTime,
  sendType
}) {
  const params = {
    platform,
    title,
    content,
    sendTime,
    sendType
  };
  return axiosService({
    url: "/admin-api-hnair/app-push/insert",
    method: "post",
    data: params
  });
}

export default {
  platform,
  messageType,
  messageStatus,
  list,
  updateStatus,
  detail,
  update,
  deleteMessage,
  insert
}
