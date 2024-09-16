<!-- ContentDocuments.vue -->
<template>
  <!-- <div
    class="limited-text cursor-pointer font-bold"
    @click="openPage(data.url)"
  >
    {{ data.url }}
  </div> -->
  <div class="d-flex mt-2" v-for="document in data.documents">
    <div
      style="height: 50px; background-color: #e9ecef; width: 60px"
      align="center"
    >
      <v-icon
        class="mt-2"
        :color="document.filename.split('.')[1] === 'pdf' ? 'red' : 'green'"
        :icon="`mdi-file-${document.filename.split('.')[1]}-box`"
        size="x-large"
      ></v-icon>
    </div>
    <div
      style="
        background-color: #f8f9fa;
        height: 50px;
        width: 100%;
        overflow: hidden;
      "
    >
      <div class="ml-1 mt-1">
        <div class="limited-text text-base">{{ document.title }}</div>
        <div class="limited-text font-light text-xs">
          {{ document.filename }}
        </div>
      </div>
    </div>
    <div style="background-color: #f8f9fa; height: 50px; width: 80px">
      <div style="margin-top: 25%; display: flex">
        <div
          class="font-light text-xs mt-1; cursor-pointer"
          @click="openPage(document.file_url)"
        >
          {{ document.size }} KB
        </div>
        <div style="display: flex">
          <v-icon
            icon="mdi-download"
            color="grey darken-1"
            class="cursor-pointer"
            @click="openPage(document.file_url)"
          ></v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DataLinkDocument } from "../types/interfaces";

onMounted(() => {});

function openPage(page: string) {
  window.open(page);
}

const props = defineProps<{
  data: DataLinkDocument;
}>();

const { data } = toRefs(props);
</script>

<style scoped>
.limited-text {
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis; /* Adds "..." at the end if text is too long */
  white-space: nowrap; /* Prevents text from wrapping to the next line */
}
</style>
