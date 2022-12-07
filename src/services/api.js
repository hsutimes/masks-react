// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import { fetchProgress } from '@/utils/fetchProgress';

/** 上传图片  */
export function uploadImageList (body) {
  return request('https://img.zhinianblog.com/api/upload/870b9d46624218fe9492151203a3616e', {
    method: 'POST',
    body: body,
    headers: {},
  });
}

/** 上传图片，自建图床  */
export function uploadImageOne (body) {
  let form = new FormData();
  form.append('file', body.file);
  return request('http://demo.hsutimes.com:19080/api/v1/upload', {
    method: 'POST',
    body: form,
    headers: {},
  });
}

/** 上传图片，显示进度条  */
export function uploadImageProgress (body, onProgress) {
  let form = new FormData();
  form.append('file', body.file);
  return fetchProgress('http://demo.hsutimes.com:19080/api/v1/upload', {
    method: 'POST',
    body: form,
    headers: {},
  }, onProgress);
}