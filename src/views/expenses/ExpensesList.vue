<template>
  <table class="w-full text-right  self-center">
    <thead class="bg-blue-500  text-white p-2 h-10">
      <tr class="text-right">
        <th class=" pr-2 ">التسلسل</th>
        <th class="  ">المقدار</th>
        <th class="  ">العنوان</th>
        <th class=" ">الوصف</th>
        <th class=" ">تاريخ الانشاء</th>
        <th class=" ">تاريخ التحديث</th>
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
