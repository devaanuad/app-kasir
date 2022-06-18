var CryptoJS = require("crypto-js");

export const setItem = (key, value) => {
  const encryptValue = CryptoJS.AES.encrypt(value, key);
  return localStorage.setItem(key, encryptValue.toString());
};

export const getItem = (key) => {
  if (localStorage.getItem(key) === null) {
    return "";
  } else {
    const decryptValue = CryptoJS.AES.decrypt(localStorage.getItem(key), key);
    return decryptValue.toString(CryptoJS.enc.Utf8);
  }
};

export const getItemJson = (key) => {
  const decryptValue = CryptoJS.AES.decrypt(localStorage.getItem(key), key);
  return JSON.parse(decryptValue.toString(CryptoJS.enc.Utf8));
};
