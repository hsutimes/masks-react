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

function randomString (length, chars) {
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
  return str2ab(encrypt(msg));
};

// 解密
const decryption = (msg) => {
  return decrypt(ab2str(msg));
};

/** Convert ArrayBuffer to String */
function ab2str (input, outputEncoding = 'gbk') {
  let view = new Uint8Array(input)
  let t = view.map((i) => {
    return parseInt(i, 8)
  })
  const decoder = new TextDecoder(outputEncoding)
  return decoder.decode(t)
}

/** Convert String to ArrayBuffer */
function str2ab (input) {
  const view = str2Uint8Array(input)
  let t = view.map((i) => {
    return i.toString(8)
  })
  return t.buffer
}

/** Convert String to Uint8Array */
function str2Uint8Array (input) {
  const encoder = new TextEncoder()
  const view = encoder.encode(input)
  return view
}

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
