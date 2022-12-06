import NodeRSA from "node-rsa";
import conf from '@/utils/conf';

const sendPublicKey = conf.settings.publicKey;
const receivePrivateKey = conf.settings.privateKey;

const publicKey = new NodeRSA(sendPublicKey)
const privateKey = new NodeRSA(receivePrivateKey)

// 加密
const encrypt = (data) => {
  return publicKey.encrypt(data, "base64")
}

// 解密
const decrypt = (data) => {
  return privateKey.decrypt(data, "utf8")
}

export {
  encrypt,
  decrypt,
}
