import CommonUtils from '@/utils';
const TokenKey = 'gis-data';

export function getToken() {
  return CommonUtils.getLocalStorage(TokenKey);
}

export function setToken(token) {
  return CommonUtils.setLocalstorage(TokenKey, token);
}

export function removeToken() {
  return CommonUtils.removeLocalstorage(TokenKey);
}
