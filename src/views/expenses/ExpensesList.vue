
<template>
    <table class="w-full  self-center">
      <thead>
        <tr>
          <th class="text-center mr-4">ID</th>
          <th class="w-[160px]">Amount</th>
          <th>Title</th>
          <th>Description</th>
          <th class="w-[190px]">Created At</th>
          <th class="w-[190px]">Updated At</th>
        </tr>
      </thead>
      <tbody>
        <ExpenseTableRow v-for="expense in reversedExpenses" :key="expense.id" :expense="expense" />
      </tbody>
    </table>
  </template>
  
  <script lang="ts" setup>
  import ExpenseTableRow from '../../components/ExpenseTableRow.vue';
  import { defineProps, computed } from 'vue';
  import type { Expense } from '../../Types';
  
  const props = defineProps({
    expenses: {
      type: Array as () => Expense[],
      required: true,
    },
  });

  const reversedExpenses = computed(() => [...props.expenses].reverse());
  </script>
  