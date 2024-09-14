<template>
  <div
    align="center"
    class="bg-[url('/background-header.jpg')] h-20 d-flex align-center"
  >
    <VCol>
      <div class="bg-[url('/brand.svg')] w-24 h-24 mt-5"></div>
    </VCol>
    <VCol
      v-if="
        !restrictedRoutes.some((routePath) => route.path.includes(routePath))
      "
    >
      <VBtn
        color="black"
        class="mb-2 px-10"
        rounded="xl"
        @click="navigateTo(redirect)"
      >
        {{ text }}
      </VBtn>
    </VCol>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "#imports";

const userStorage = useUserStore();
const restrictedRoutes = ["/login", "/todas_ordens/"]; // Lista de rotas que você quer verificar
const route = useRoute();
const text = ref("");
const redirect = ref("/login/");

onMounted(async () => {
  const token = localStorage.getItem("token");
  const validToken = await userStorage.verifyToken(token);
  if (validToken && token) {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    text.value = "Ver ordens";
    redirect.value = `/todas_ordens/${dataUser.id_usuario}/`;
  } else {
    text.value = "Entrar";
  }
});
</script>
