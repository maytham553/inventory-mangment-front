<template>
  <div
    class="flex items-center
     justify-center gap-3 px-20 
    py-2 z-0   
    bg-opacity-70 backdrop-blur-sm rounded-full 
    absolute bottom-5 bg-[#a2c4dd]"
  >
    <button
      class="disabled:opacity-30 p-1 rounded-lg hover:bg-primary"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <h1 class="font-bold text-[#172350]">&lt;</h1>
    </button>
    <button
      class="text-white bg-secondary cursor-pointer hover:bg-primary disabled:opacity-70 p-1 rounded-lg w-20"
      :disabled="currentPage === 1"
      @click="goToPage(1)"
    >
      الاولى
    </button>
    <button
      v-if="currentPage > 1"
      class="bg-secondary cursor-pointer font-bold text-white hover:bg-primary rounded-full h-8 w-8 flex items-center justify-center"
      @click="goToPage(currentPage - 1)"
    >
      {{ currentPage - 1 }}
    </button>
    <button
      class="font-bold bg-white text-[#0E1932] border border-secondary 
      cursor-pointer hover:bg-primary hover:text-white rounded-full h-8 w-8 flex items-center justify-center"
      disabled
      @click="goToPage(currentPage)"
    >
      {{ currentPage }}
    </button>
    <button
      v-if="totalPages >= currentPage + 1"
      class="text-white bg-secondary cursor-pointer font-bold hover:bg-primary rounded-full
       h-8 w-8 flex items-center justify-center"
      @click="goToPage(currentPage + 1)"
    >
      {{ currentPage + 1 }}
    </button>
    <button
      v-if="totalPages >= currentPage + 2"
      class="text-white bg-secondary cursor-pointer font-bold hover:bg-primary rounded-full h-8 w-8 flex items-center justify-center"
      @click="goToPage(currentPage + 2)"
    >
      {{ currentPage + 2 }}
    </button>

    <span v-if="totalPages >= currentPage + 4">...</span>
    <button
      v-if="totalPages >= currentPage + 4"
      class="text-white bg-secondary cursor-pointer font-bold hover:bg-primary rounded-full h-8 w-8 flex items-center justify-center"
      @click="goToPage(totalPages)"
    >
      {{ totalPages }}
    </button>

    <button
      class="disabled:opacity-70 text-white bg-secondary cursor-pointer hover:bg-primary p-1 rounded-lg w-20"
      :disabled="currentPage === totalPages"
      @click="goToPage(totalPages)"
    >
      الاخيرة
    </button>
    <button
      class="disabled:opacity-30 p-1 rounded-lg hover:bg-primary"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <h1 class="font-bold text-[#172350]">&gt;</h1>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  goToPage: {
    type: Function,
    required: true,
  },
});

const goToPage = (page: number) => {
  props.goToPage(page);
};
</script>
