<template>
  <NuxtLayout>
    <vContainer fluid style="padding-left: 5%; padding-right: 5%">
      <VRow>
        <VCol xs="12" sm="12" md="12" lg="4" cols="12">
          <CardAutokm>
            <v-img :src="info_oficina.logo"></v-img>
            <div class="text-black text-xl text-center">
              {{ info_oficina.empresa_nome }}
            </div>
            <div class="text-center text-gray-600">{{ info_oficina.cnpj }}</div>
            <div align="center" class="mt-1">
              <VRow>
                <VCol v-if="info_oficina.home_link">
                  <v-icon
                    color=""
                    @click="goToPage(info_oficina.home_link)"
                    class="cursor-pointer"
                    >mdi-home</v-icon
                  >
                </VCol>
                <VCol v-if="info_oficina.maps_link">
                  <v-icon
                    color=""
                    @click="goToPage(info_oficina.maps_link)"
                    class="cursor-pointer"
                    >mdi-map</v-icon
                  >
                </VCol>
              </VRow>
            </div>
          </CardAutokm>

          <CardAutokm title="Destinatário">
            <div class="font-semibold">Nome:</div>
            <div>{{ info_destinatario.nome }}</div>
            <hr
              style="border: 1px solid #c2c2c2; border-radius: 5px"
              class="my-3"
            />
            <div class="font-semibold">CNPJ:</div>
            <div>{{ info_destinatario.cpf_cnpj }}</div>
          </CardAutokm>
          <CardAutokm title="Links das NFS-e">
            <VRow>
              <VCol v-for="data in data_link_documents" :key="data.id">
                <ContentDocuments class="mt-5" :data="data" />
              </VCol>
            </VRow>
          </CardAutokm>
        </VCol>

        <!-- Right Side -->

        <VCol xs="12" sm="12" md="12" lg="8" cols="12">
          <VDivider
            style="border: 1px solid #c2c2c2; border-radius: 5px"
            v-if="mobile"
            class="mb-10"
          />
          <CardAutokm>
            <VRow>
              <VCol
                ><MiniInfo
                  icon="mdi-file"
                  title="Número da Nota"
                  :value="info_nota.numero_nota"
              /></VCol>
              <VCol
                ><MiniInfo
                  icon="mdi-calendar-range"
                  title="Data de emissão"
                  :value="info_nota.data_emissao"
              /></VCol>
              <VCol
                ><MiniInfo
                  icon="mdi-cash"
                  title="Valor da nota"
                  :value="'R$' + info_nota.valor_nota.replace('.', ',')"
              /></VCol>
            </VRow>
          </CardAutokm>
          <CardAutokm title="Parcelas">
            <TableParcelas :parcelas="info_parcelas" />
          </CardAutokm>
          <CardAutokm :title="info_carro.nome_carro">
            <VRow>
              <VCol
                v-for="(item, index) in info_carro.imagens_carro"
                :key="index"
              >
                <v-img
                  :width="300"
                  aspect-ratio="16/9"
                  cover
                  :src="item"
                ></v-img>
              </VCol>
            </VRow>
          </CardAutokm>
        </VCol>
      </VRow>
    </vContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useApi } from "#imports";

import type {
  DataLinkDocuments,
  InfoDestinatario,
  InfoNota,
  InfoCarro,
  InfoParcelas,
} from "~/types/interfaces";
import { useDisplay } from "vuetify";

const route = useRoute();
const api = useApi();

const { mobile } = useDisplay();

const data_link_documents = ref<DataLinkDocuments>();
const info_nota = ref<InfoNota>({
  numero_nota: "",
  data_emissao: "",
  valor_nota: "",
});
const info_destinatario = ref<InfoDestinatario>({
  nome: "DESTINATARIO",
  cpf_cnpj: "xx.xxx.xxx/xxxx-xx",
});
const info_carro = ref<InfoCarro>({
  nome_carro: "Ford Fiesta Branco",
  imagens_carro: [],
});
const info_parcelas = ref<InfoParcelas>([]);
const info_oficina = ref({
  empresa_nome: "",
  cnpj: "",
  logo: "",
  maps_link: "",
  home_link: "",
});

function goToPage(link) {
  window.open(link);
}

onBeforeMount(async () => {
  api
    .dfetchWithAuth(`/api/notas/${route.params.id}/`, {
      method: "GET",
    })
    .then((res) => {
      info_carro.value = {
        nome_carro: res.nome_carro,
        imagens_carro: res.Imagens.map((item) => item.src),
      };
      info_parcelas.value = res.parcelas;
      info_destinatario.value = { nome: res.destinatario, cpf_cnpj: res.cnpj };
      info_nota.value = {
        numero_nota: res.numero_nota,
        data_emissao: res.data_emissao,
        valor_nota: res.valor_nota,
      };
      info_oficina.value = res.oficina;
      data_link_documents.value = [
        {
          id: "1",
          url: "",
          documents: res.links,
        },
      ];
    });
});

definePageMeta({
  layout: "costumer",
});
</script>
