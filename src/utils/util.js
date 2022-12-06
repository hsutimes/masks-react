import { encryptAes, decryptAes } from '@/utils/crypto';
import { encrypt, decrypt } from '@/utils/rsa';

const c_set = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const randomColor = () => {
  let r, g, b;
  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  return { background: 'rgb(' + r + ',' + g + ',' + b + ')' };
};

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const randomChar = () => {
  return randomString(3, c_set);
};

const randomKey = () => {
  return randomString(32, c_set);
};

const randomStr = (l) => {
  return randomString(l, c_set);
};

// 加密
const encryption = (msg) => {
  return encrypt(msg);
};

// 解密
const decryption = (msg) => {
  return decrypt(msg);
};

export {
  randomColor,
  randomChar,
  randomStr,
  randomKey,
  encryption,
  decryption,
  encryptAes,
  decryptAes,
};
