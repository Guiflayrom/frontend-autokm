<template>
  <v-table height="300px">
    <thead>
      <tr>
        <th class="text-left" v-for="header in headers" :key="header">
          {{ header }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="item.file_url ? 'cursor-pointer hover:bg-gray-200' : ''"
        v-for="item in parcelas"
        :key="item.identificacao"
        @click="item.file_url ? clip(item.numeracao_boleto) : null"
      >
        <td>{{ item.identificacao }}</td>
        <td>{{ item.parcela }}</td>
        <td>{{ item.vencimento }}</td>
        <td>
          <VChip
            variant="elevated"
            :color="
              item.situacao == 'Pago'
                ? 'success'
                : item.situacao == 'Atrasado'
                  ? 'error'
                  : item.situacao == 'Pendente'
                    ? 'warning'
                    : ''
            "
          >
            <div class="select-none">
              {{ item.situacao }}
            </div>
          </VChip>
        </td>
        <td>R${{ item.valor.replace(".", ",") }}</td>
        <td>
          <div class="d-flex" v-if="item.file_url">
            <VIcon
              color="black"
              icon="mdi-download"
              class="mr-2 cursor-pointer"
              @click="navigateTo(item.file_url, { external: true })"
            ></VIcon>
            <VIcon
              color="black"
              icon="mdi-clipboard"
              class="mr-2 cursor-pointer"
              @click="clip(item.numeracao_boleto)"
            ></VIcon>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-snackbar v-model="snackbar" elevation="24" color="green">
    <div>Número do boleto copiado com sucesso!</div>
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        <b> Fechar </b>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { VIcon } from "vuetify/components";
import type { InfoParcelas } from "../types/interfaces";
const props = defineProps<{
  parcelas: InfoParcelas;
}>();

function clip(item: string) {
  navigator.clipboard.writeText(item).then(
    () => {
      snackbar.value = true;
    },
    () => {
      console.error("Falha ao copiar o texto");
    },
  );
}

const snackbar = ref(false);

const { parcelas } = toRefs(props);
const headers = ["Identificação", "Parcela", "Vencimento", "Situação", "Valor"];
</script>
