import { defineStore } from 'pinia';

export const appStoreName = 'counter';
export const useAppStore = defineStore(appStoreName, {
  state: () => ({
    token: '',
  }),
  getters: {
    decoded: (state) => {
      if (!state.token) {
        return null;
      }
      //return jwtDecode(state.token) as JwtPayload & { roles: string[] };
    },
    expiresAt(): Date | null | undefined {
      // if (!this.decoded || !this.decoded.exp) {
      //   return null;
      // }
      // const { exp } = this.decoded;
      //return new Date(exp * 1000);
      return;
    },
  },
  actions: {
    isLogged() {
      if (!this.expiresAt) {
        return false;
      }
      return this.expiresAt.getTime() > new Date().getTime();
    },
  },
});
export type AppStore = ReturnType<typeof useAppStore>;
