<template>
  <div class="h-screen w-screen absolute top-0 left-0 bg-white z-50 flex items-center flex-col gap-10 justify-center">
    <svg
      :width="size"
      :height="size"
      class="animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        :stroke="strokeColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        :fill="strokeColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
    <h2 class="rtl text-xl text-secondary">جاري التحميل...</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    size: {
      type: Number,
      default: 24,
    },
    strokeColor: {
      type: String,
      default: "currentColor",
    },
  },
});
</script>
