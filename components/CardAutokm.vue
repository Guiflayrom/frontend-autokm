<template>
  <VCard class="autokmCard my-10" elevation="5">
    <VRow v-if="title">
      <VCol>
        <div class="text-black text-xl mb-5 font-semibold">
          {{ title }}
        </div>
      </VCol>
      <VCol></VCol>
    </VRow>
    <slot></slot>
  </VCard>
</template>

<script setup>
defineProps({
  title: { type: String, required: false, default: "" },
  icons: { type: Array, required: false, default: [] },
});
</script>

<style scoped>
.autokmCard {
  border-radius: 0.975rem;
  background-color: white;
  padding: 1.6rem;
  border-bottom: 4px solid #f89136;
  box-shadow: 0 0.5rem 0.7rem rgba(0, 0, 0, 0.1);
}
</style>
