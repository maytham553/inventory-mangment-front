<template>
  <div class="flex w-full justify-center gap-3 sm:gap-4 rounded-xl items-center">
    <div class="relative flex-1 max-w-xl min-w-0">
      <input
        class="w-full bg-white border border-slate-300 py-2.5 ps-4 pe-10 rounded-xl text-sm focus:ring-2 focus:ring-secondary/30 focus:border-secondary outline-none transition-shadow"
        type="text"
        :placeholder="placeholder"
        v-model="search"
        @keyup.enter="runSearch"
      />
      <button
        v-if="search.length"
        type="button"
        class="absolute end-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md"
        aria-label="مسح"
        @click="clearInput"
      >
        ×
      </button>
    </div>
    <button
      type="button"
      @click="runSearch"
      class="bg-secondary shrink-0 rounded-xl hover:bg-secondary/90 text-white font-bold py-2.5 px-5 text-sm shadow-sm transition-colors"
    >
      بحث
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

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
  /** When set, keeps input in sync (e.g. reset filters from parent). */
  modelValue: {
    type: String,
    required: false,
    default: undefined,
  },
});

const search = ref(props.modelValue ?? "");

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined && v !== search.value) {
      search.value = v;
    }
  }
);

const runSearch = (): void => {
  props.handleSearch(props.pageNumber, search.value);
};

const clearInput = (): void => {
  search.value = "";
  props.handleSearch(props.pageNumber, "");
};
</script>
