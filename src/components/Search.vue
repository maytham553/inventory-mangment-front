<template>
  <div class="flex w-full justify-center gap-5 rounded-lg items-center">
    <input
      class="w-full max-w-[400px]  bg-gray-200 py-2 px-4 rounded-lg focus:border-none"
      type="text"
      :placeholder="placeholder"
      v-model="search"
      @keyup.enter="handleSearch"
    />
    <button
      @click="handleSearch"
      class="bg-secondary  rounded-lg hover:bg-secondary/60 text-white font-bold py-2 px-4 w-[20]"
    >
      بحث
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  handleSearch: {
    type: Function,
    required: true,
  },
  pageNumber: {
    type: Number,
    required: false,
    default: 1,
  },
  placeholder: {
    type: String,
    required: false,
    default: "بحث",
  },
});

const search = ref("");

const handleSearch = (): void => {
  const pageNumber = props.pageNumber;
  props.handleSearch(pageNumber, search.value);
};
</script>
