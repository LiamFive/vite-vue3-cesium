import { defineStore } from 'pinia';
import { getToken, setToken, removeToken } from '@/helpers/auth-storage';
import { userLoginApi, userLogoutApi, getUserInfoApi } from '@/api/personal-center';

const user = defineStore({
  // 这里的id必须为唯一ID
  id: 'user',
  state: () => {
    return {
      token: getToken(),
      user: { ...defaultUser },
      rights: [],
      roles: [],
    };
  },
  // 等同于vuex的getter
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },
  // pinia 放弃了 mutations 只使用 actions
  actions: {
    // actions可以用async做成异步形式
    async setThemeType(type) {
      this.themeType = type;
    },
    async userLogin({ userName, password }) {
      try {
        const response = await userLoginApi(userName, password);
        const { tokenVo } = response;
        const { accessToken, tokenType } = tokenVo;
        const token = `${tokenType} ${accessToken}`;
        if (token) {
          setToken(token);
          this.token = token;
        }

        return response;
      } catch (err) {
        console.log(err); // eslint-disable-line
        return Promise.reject(err);
      }
    },

    async getUserInfo() {
      try {
        const response = await getUserInfoApi();
        if (!response) return Promise.reject();

        const { moduleIds, userInfo } = response;

        this.rights = moduleIds;
        this.user = userInfo;

        return response;
      } catch (err) {
        console.log(err); // eslint-disable-line
        return Promise.reject(err);
      }
    },

    async userLogOut() {
      try {
        const response = await userLogoutApi();

        this.token = '';
        this.rights = [];
        this.roles = [];
        this.user = { ...defaultUser };
        removeToken();

        return response;
      } catch (err) {
        console.log(err); // eslint-disable-line
        return Promise.reject(err);
      }
    },

    resetToken() {
      return new Promise((resolve) => {
        this.token = '';
        this.rights = [];
        this.roles = [];
        this.user = { ...defaultUser };
        removeToken();
        resolve();
      });
    },
  },
});

export default user;
