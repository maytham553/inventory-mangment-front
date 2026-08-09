<template>
  <svg :width="size" :height="size" :fill="fill" viewBox="0 0 24 24">
    <path
      d="M12 2C7.582 2 4 3.343 4 5v14c0 1.657 3.582 3 8 3s8-1.343 8-3V5c0-1.657-3.582-3-8-3zm0 2c3.86 0 6 1.12 6 1s-2.14 1-6 1-6-1.12-6-1 2.14-1 6-1zm6 15c0 .12-2.14 1-6 1s-6-.88-6-1v-2.34C7.47 17.5 9.61 18 12 18s4.53-.5 6-1.34zm0-5c0 .12-2.14 1-6 1s-6-.88-6-1v-2.34C7.47 12.5 9.61 13 12 13s4.53-.5 6-1.34zm0-5c0 .12-2.14 1-6 1s-6-.88-6-1V6.66C7.47 7.5 9.61 8 12 8s4.53-.5 6-1.34z" />
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
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>
