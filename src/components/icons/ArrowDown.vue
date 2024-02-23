
<template>
  <svg :width="size" :height="size" :stroke="strokeColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M6 9L12 15L18 9"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    size: {
      type: Number,
      default: 24,
    },
    strokeColor: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>