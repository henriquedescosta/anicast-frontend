<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-0 col-md-6 flex justify-end content-center">
      <img
        src="~assets/konata png.png"
        class="responsive"
        alt="login-image"
        style="max-height: 500px"
      />
    </div>
    <div class="col-0 col-md-6 flex justify-center content-center">
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/arte konata.jpg" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">
                Login
              </h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <div class="text-center">
              <q-btn
                type="a"
                :href="malUrl.url"
                color="primary"
                label="Logar com MAL"
              />
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-white" to="/login"
                  >Dúvidas?</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineStore } from 'pinia';
import { defineComponent, onBeforeUnmount, ref } from 'vue';

export const loginPageStoreName = 'loginPage';
export const useLoginPageStore = defineStore(loginPageStoreName, {
  state: () => ({}),
  actions: {
    forget() {
      console.log('forget: not implemented yet');
    },
    async malUrl() {
      const store = useLoginPageStore();
      const { data }: any = await store.$malApi.malControllerOAuth();

      return data;
      //appStore.token = data.accessToken;
    },
  },
});
export type LoginPageStore = ReturnType<typeof useLoginPageStore>;

export default defineComponent({
  name: 'IndexPage',
  components: {},
  async mounted() {
    const store = useLoginPageStore();
    this.malUrl = await store.malUrl();
    console.log(this.malUrl);
  },
  setup() {
    const store = useLoginPageStore();
    onBeforeUnmount(() => store.$dispose());
    //const { data }: any = await store.$malApi.malControllerOAuth();
    //const aux = data;
    //console.log(aux.url);
    const malUrl = ref({ code: 'a', url: 'b' });
    return {
      malUrl,
    };
  },
});
</script>
