<template>
  <NuxtLayout>
    <vContainer fluid style="padding-left: 5%; padding-right: 5%">
      <VRow>
        <VCol xs="12" sm="12" md="2" lg="2" cols="12">
          <CardAutokm
            :height="mobile ? '120' : '500'"
            :class="mobile ? 'overflow-x-auto' : ''"
          >
            <div v-if="!mobile">
              <div class="text-center mb-5">Filtro</div>
              <v-list v-model:opened="open" height="420px">
                <v-list-group
                  :value="item.ano"
                  v-for="(item, index) in datas_disponiveis"
                  :key="index"
                >
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="item.ano"></v-list-item>
                  </template>

                  <v-list-item
                    :title="mes"
                    v-for="(mes, index) in item.meses"
                    :key="index + mes + item.ano"
                    class="cursor-pointer"
                    @click="filterMes(mes, item.ano)"
                  ></v-list-item>
                </v-list-group>
              </v-list>
            </div>
            <div class="d-flex">
              <div v-for="(item, index) in datas_disponiveis" :key="index">
                <div class="ml-2" v-if="index != 0">
                  <hr class="vertical-line" />
                </div>

                <div class="ml-5 font-semibold text-xl select-none">
                  {{ item.ano }}
                </div>
                <div class="d-flex mx-5 mt-2 text-xl">
                  <div
                    class="ml-10 cursor-pointer select-none"
                    v-for="(mes, index) in item.meses"
                    :key="index"
                    @click="filterMes(mes, item.ano)"
                  >
                    {{ mes }}
                  </div>
                </div>
              </div>
            </div>
          </CardAutokm>
        </VCol>
        <VCol xs="12" sm="12" md="10" lg="10" cols="12"
          ><CardAutokm height="500" :class="mobile ? 'overflow-x-auto' : ''">
            <div class="font-base text-5xl mb-10">
              Ordens {{ currentData ? `- ${currentData}` : "" }}
            </div>
            <VDataTable
              class="overflow-x-auto"
              :headers="headers"
              :items="dataT"
              item-key="id"
              hide-default-footer
            >
              <template v-slot:item.actions="{ item }">
                <v-tooltip text="Visualizar" location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      class="me-2 cursor-pointer"
                      @click="navigateTo('/ordem/' + item.id)"
                      size="small"
                      v-bind="props"
                    >
                      mdi-eye
                    </v-icon>
                  </template>
                </v-tooltip>
              </template>
              <template v-slot:item.valor_nota="{ item }">
                R${{ item.valor_nota.replace(".", ",") }}
              </template>
              <template v-slot:item.parcelas="{ item }">
                <v-tooltip
                  :text="
                    item.parcelas.find((item) => item.situacao == 'Atrasado')
                      ? 'Você possui parcela(s) em atraso!'
                      : 'Não há parcelas em atraso!'
                  "
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <div
                      :class="
                        item.parcelas.find(
                          (item) => item.situacao == 'Atrasado',
                        )
                          ? 'bg-red-500 mx-10 text-white font-bold'
                          : 'bg-green-500 mx-10 text-white font-bold'
                      "
                      v-bind="props"
                    >
                      {{ item.parcelas.length }}
                    </div>
                  </template>
                </v-tooltip>
              </template>
            </VDataTable>
          </CardAutokm></VCol
        >
      </VRow>
    </vContainer>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";
import { useApi } from "#imports";

const api = useApi();

const datas_disponiveis = ref([]);

const mesesDicionario = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

const { mobile } = useDisplay();

const headers = ref([
  {
    title: "Número da nota",
    align: "center",
    sortable: true,
    key: "numero_nota",
  },
  {
    title: "Data da emissão",
    align: "center",
    sortable: true,
    key: "data_emissao",
  },
  {
    title: "Qtd. Parcelas",
    align: "center",
    sortable: true,
    key: "parcelas",
  },
  {
    title: "Valor (R$)",
    align: "center",
    sortable: true,
    key: "valor_nota",
  },
  { title: "Ações", key: "actions", sortable: false, align: "center" },
]);

const data = ref([
  {
    nnf: "",
    data_emissao: "",
    parcelas: [],
    valor: "",
    url: "",
  },
]);

const dataT = ref([...data.value]);

const open = ref();
const currentData = ref("");

function filterMes(mes, ano) {
  if (currentData.value === mes) {
    currentData.value = "";
    dataT.value = [...data.value];
  } else {
    currentData.value = mes;

    dataT.value = [
      ...data.value.filter((item) => {
        const [_, mesEmissao, anoEmissao] = item.data_emissao.split("/"); // Extrai o mês e o ano de data_emissao
        const mesNome = mesesDicionario[mesEmissao]; // Mapeia o número do mês para o nome do mês
        return mesNome === mes && anoEmissao === ano; // Verifica se o mês e o ano coincidem
      }),
    ];
  }
}

onMounted(async () => {
  const res = await api.dfetchWithAuth(
    `/api/data/${JSON.parse(localStorage.getItem("dataUser")).id_usuario}/`,
    {
      method: "GET",
    },
  );
  data.value = res;
  dataT.value = res;
  updateFilterWay();
});

function updateFilterWay() {
  data.value.forEach((item) => {
    const [dia, mes, ano] = item.data_emissao.split("/"); // Extrai dia, mês e ano de data_emissao
    const mesNome = mesesDicionario[mes]; // Converte o número do mês para o nome do mês

    const anoExistente = datas_disponiveis.value.find(
      (entry) => entry.ano === ano,
    );

    if (anoExistente) {
      if (!anoExistente.meses.includes(mesNome)) {
        anoExistente.meses.push(mesNome);
      }
    } else {
      datas_disponiveis.value.push({ ano: ano, meses: [mesNome] });
    }
  });
}

definePageMeta({
  layout: "costumer",
  middleware: ["auth"],
});
</script>

<style>
.vertical-line {
  width: 1px; /* Define a linha vertical com 1px de largura */
  height: 50px; /* Define a altura da linha */
  background-color: black; /* Define a cor da linha */
  border: none; /* Remove qualquer borda padrão do <hr> */
  position: absolute;
}
</style>
