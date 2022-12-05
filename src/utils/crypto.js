import CryptoJS from 'crypto-js';

// AES/DES加密解密
var aseKey = "59acd66a6d5e54c6328411875c03bfb5"     //秘钥必须为：8/16/32位

//加密
function encrypt (message) {
  return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
}

//解密
function decrypt (message) {
  return CryptoJS.AES.decrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
}

export {
  encrypt, decrypt
}