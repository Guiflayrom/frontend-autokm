<template>
  <NuxtLayout>
    <div class="d-flex justify-center align-center align-items-center">
      <CardAutokm width="700px" height="600" align="center" :loading="loading">
        <div
          style="height: 550px; background-color: #fafafa; max-width: 500px"
          class="rounded-3xl pt-4"
        >
          <div class="text-center font-semibold text-4xl" align="center">
            Login
          </div>
          <div class="border-2 mx-16 border-t-0 pb-5">
            <v-tabs
              v-model="tab"
              align-tabs="center"
              class="mt-5 border-2 border-x-0"
              color="deep-orange-accent-4"
            >
              <v-tab :value="1" @click="resetInfo()">Cliente</v-tab>
              <v-tab :value="2" @click="resetInfo()">Gerencial</v-tab>
            </v-tabs>
            <div style="height: 300px; max-width: 500px" class="pa-10 my-5">
              <v-tabs-window v-model="tab">
                <div>
                  <VForm v-model="form" align="center">
                    <v-tabs-window-item :key="1" :value="1">
                      <VRow class="mt-16">
                        <VCol cols="12">
                          <VTextField
                            required
                            v-model="username"
                            :rules="[
                              () => !!username || 'Este campo é obrigatório',
                            ]"
                            label="CPF ou CNPJ"
                            placeholder="Digite seu CPF ou CNPJ"
                            variant="outlined"
                          />
                        </VCol>
                      </VRow>
                    </v-tabs-window-item>
                  </VForm>
                  <VForm v-model="form" align="center">
                    <v-tabs-window-item :key="2" :value="2">
                      <VRow class="mt-2">
                        <VCol cols="12">
                          <VTextField
                            v-model="username"
                            :rules="[
                              () => !!username || 'Este campo é obrigatório',
                            ]"
                            placeholder="Digite seu e-mail"
                            label="E-mail"
                            variant="outlined"
                          />
                        </VCol>
                        <VCol cols="12">
                          <VTextField
                            required
                            :type="show ? 'text' : 'password'"
                            v-model="password"
                            placeholder="Digite sua senha"
                            :rules="[
                              () => !!password || 'Este campo é obrigatório',
                            ]"
                            label="Senha"
                            variant="outlined"
                            :append-inner-icon="
                              show ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append-inner="show = !show"
                          />
                        </VCol>
                      </VRow>
                    </v-tabs-window-item>
                  </VForm>
                </div>
              </v-tabs-window>
            </div>
            <VRow>
              <VCol>
                <VBtn
                  width="150"
                  :disabled="!form"
                  color="warning"
                  @click="login()"
                  :loading="loading"
                  >Entrar</VBtn
                ></VCol
              >
            </VRow>
          </div>
        </div>
      </CardAutokm>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const show = ref(false);
const tab = ref("");
const username = ref("");
const password = ref("");
const form = ref(false);
const loading = ref(false);

function resetInfo() {
  username.value = "";
  password.value = "";
  form.value = false;
}

function login() {
  setTimeout(() => {
    loading.value = true;
  }, 10);
  setTimeout(() => {
    loading.value = false;

    userStore.login(
      username.value,
      password.value != "" ? password.value : "inicial@123",
    );
  }, 2000);
}

definePageMeta({
  layout: "costumer",
});
</script>
