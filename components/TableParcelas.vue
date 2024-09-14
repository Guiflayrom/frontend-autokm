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
      <tr v-for="item in parcelas" :key="item.identificacao">
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
        <!-- <td>
          <div class="d-flex">
            <VIcon color="black" icon="mdi-download" class="mr-2"></VIcon>
            <VIcon color="black" icon="mdi-eye"></VIcon>
          </div>
        </td> -->
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { VIcon } from "vuetify/components";
import type { InfoParcelas } from "../types/interfaces";
const props = defineProps<{
  parcelas: InfoParcelas;
}>();

const { parcelas } = toRefs(props);

const headers = ["Identificação", "Parcela", "Vencimento", "Situação", "Valor"];
</script>
