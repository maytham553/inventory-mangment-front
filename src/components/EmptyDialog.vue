<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="h-full w-full bg-white z-30 flex flex-col overflow-hidden">
      <div
        v-if="!hiddenBar"
        class="flex justify-between items-center bg-blue-700 font-bold text-gray-100 p-4"
      >
        <div></div>
        <h2 class="text-xl font-bold">{{ title }}</h2>
        <button
          @click="closeDialog"
          type="button"
          class="flex items-center justify-between py-1 px-2 bg-white text-black rounded-lg"
        >
        
          اغلاق
          <svg
            viewBox="0 0 470 1000"
            fill="currentColor"
            height="16px"
            width="16px"
            class="text-red-500 hover:text-red-700 w-10 h-10"
          >
            <path
              d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156"
            />
          </svg>
        </button>
      </div>
      <div class="pt-8 px-8 h-full w-full overflow-auto">
        <slot></slot>
      </div>
    </div>
    <div
      class="absolute inset-0 bg-black opacity-30 z-10"
      @click="closeDialog"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  closeDialog: {
    type: Function,
    required: true,
  },
  hiddenBar: {
    type: Boolean,
    default: false,
  },
});

const closeDialog = () => {
  props.closeDialog();
};
</script>
