import { useState, useCallback } from 'react';

import { uploadImageList } from '@/services/api';

export default () => {
  const uploadImage = useCallback(async (body, cb) => {
    const r = await uploadImageList(body);
    if (r.success) {
      cb(true, r.url, '上传成功');
    } else {
      cb(false, [], r.error);
    }
  }, []);

  return {
    uploadImage,
  };
};
