<template>
<tr :class="{ 'bg-gray-200': isEvenRow, 'bg-gray-100': isOddRow}">
      <td class="text-center">{{ expense.id }}</td>
      <td class="pr-8">{{ expense.amount }}</td>
      <td>{{ expense.title }}</td>
      <td class="max-w-[60px] truncate px-6 hover:max-w-full">{{ expense.description || 'N/A' }}</td>
      <td class="max-w-[100px]">{{ ISO8601DateToHumanDate(expense.created_at) }}</td>
      <td class="max-w-[100px]">{{ ISO8601DateToHumanDate(expense.updated_at) }}</td>
    </tr>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { ISO8601DateToHumanDate } from '../services/helper/helperFunctions';

  const props = defineProps(['expense']);
const isEvenRow = computed(() => props.expense.id % 2 === 0);
const isOddRow = computed(() => props.expense.id % 2 !== 0);
  </script>
  
  