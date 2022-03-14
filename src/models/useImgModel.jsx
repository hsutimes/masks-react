import { useState, useCallback } from 'react';

import { uploadImageList } from '@/services/api';

export default () => {
  const uploadImage = useCallback(async (body, cb) => {
    const r = await uploadImageList(body);
    if (r.success) {
      cb(true, r.result, '上传成功');
    } else {
      cb(false, [], r.message);
    }
  }, []);

  return {
    uploadImage,
  };
};
