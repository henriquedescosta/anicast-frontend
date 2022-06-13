import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { MalApi } from 'src/services/api';
import { inject, InjectionKey } from 'vue';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: AxiosInstance;
    $malApi: MalApi;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export const apiKey: InjectionKey<AxiosInstance> = Symbol('api-key');
export const malApiKey: InjectionKey<MalApi> = Symbol('mal-api-key');
export function useApi() {
  return {
    api: inject(apiKey),
    malApi: inject(malApiKey),
  };
}
export default boot(async ({ app, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const url = 'http://localhost:3000';
  const api = axios.create({ baseURL: url }) as never;

  const malApi = new MalApi(undefined, url, api);

  app.provide(apiKey, api);
  app.provide(malApiKey, malApi);

  store.use(() => ({
    $api: api,
    $malApi: malApi,
  }));
});
