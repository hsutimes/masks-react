import { useState, useCallback } from 'react';

import {
  uploadImageList,
  uploadImageOne,
  uploadImageProgress,
} from '@/services/api';

export default () => {
  const uploadImage = useCallback(async (body, cb) => {
    const r = await uploadImageList(body);
    if (r.success) {
      cb(true, r.url, '上传成功');
    } else {
      cb(false, [], r.error);
    }
  }, []);

  const uploadImageSingle = useCallback(async (body, cb) => {
    const r = await uploadImageOne(body);
    if (r.status_code === 200) {
      cb(true, r.image.url, r.success.message);
    } else {
      cb(false, [], r.error.message);
    }
  }, []);

  const uploadImageSingleProgress = useCallback(
    async (body, onProgress, cb) => {
      const r = await uploadImageProgress(body, onProgress);
      console.log(r);
      if (r.status_code === 200) {
        cb(true, r.image.url, r.success.message);
      } else {
        cb(false, [], r.error.message);
      }
    },
    [],
  );

  return {
    uploadImage,
    uploadImageSingle,
    uploadImageSingleProgress,
  };
};
