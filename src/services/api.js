// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

/** 上传图片  */
export function uploadImageList (body) {
  return request('http://127.0.0.1:36677/upload', {
    method: 'POST',
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}