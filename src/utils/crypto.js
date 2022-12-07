import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const c_set = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomString (length, chars) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const randomKey = () => {
  return randomString(32, c_set);
};

// AES/DES加密解密
// 秘钥必须为：8/16/32位
var aseKey = '59acd66a6d5e54c6328411875c03bfb5';
// var aseKey = '';
// var key = Cookies.get('msg_key');
// if (key) {
//   aseKey = key;
// } else {
//   aseKey = randomKey();
//   Cookies.set('msg_key', aseKey);
// }
// console.log(`aseKey: ${aseKey}`);

//加密
function encryptAes (message) {
  return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

//解密
function decryptAes (message) {
  let res = message;
  try {
    res = CryptoJS.AES.decrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    // console.log(res);
    if (res.sigBytes > 0) {
      res = res.toString(CryptoJS.enc.Utf8);
    } else {
      res = message;
    }
  } catch (error) {
    console.error(error);
  }
  return res;
}

export { encryptAes, decryptAes };
