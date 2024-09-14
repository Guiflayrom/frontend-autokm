<template>
  <div>
    <div class="d-flex">
      <VIcon :icon="icon" color="grey darken-1" size="large"></VIcon>
      <div class="text-lg text-gray-600 limited-text">{{ title }}</div>
    </div>
    <div class="font-semibold text-lg ml-1 limited-text">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: string;
  title: string;
  value: string;
}>();

const { icon } = toRefs(props);
const { title } = toRefs(props);
const { value } = toRefs(props);
</script>

<style scoped>
.limited-text {
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis; /* Adds "..." at the end if text is too long */
  white-space: nowrap; /* Prevents text from wrapping to the next line */
}
</style>
