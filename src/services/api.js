// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

/** 上传图片  */
export function uploadImageList (body) {
  return request('https://img.zhinianblog.com/api/upload/870b9d46624218fe9492151203a3616e', {
    method: 'POST',
    body: body,
    headers: {},
  });
}