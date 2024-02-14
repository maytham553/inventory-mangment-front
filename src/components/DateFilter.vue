<template>
    <div class="flex justify-between items-center gap-2 bg-gray-200 p-3 rounded-lg ">
      <div class="flex items-center gap-3">
        <label for="from">من</label>
        <input v-model="selectedFrom" type="date" id="from" class="border-2 rounded-lg py-1 px-3" :max="maxDate" :min="minDate"  />
      </div>
      <div class="flex items-center gap-3">
        <label for="to">إلى</label>
        <input v-model="selectedTo" type="date" id="to" class="border-2 rounded-lg py-1 px-3"  :min="selectedFrom" :max="maxDate"  />
      </div>
      <button @click="filterByDate" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 flex-1 max-w-xs px-4 rounded-lg">
        بحث
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref } from 'vue';
  
  const getToday = () => new Date().toISOString().split('T')[0];
  const getTwoYearsAgo = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 2);
    return today.toISOString().split('T')[0];
  };

  const today = getToday();

  
  const selectedFrom = ref(today);
  const selectedTo = ref(today);
  
  const props = defineProps({
    filter: {
      type: Function,
      required: true
    }
  });
  
  
  const maxDate = computed(() => getToday());
  const minDate = computed(() => getTwoYearsAgo());
  
  const filterByDate = () => {
    props.filter(selectedFrom.value, selectedTo.value);
  };
  </script>
  