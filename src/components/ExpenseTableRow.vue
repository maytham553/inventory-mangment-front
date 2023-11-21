<template>
  <tr
    class="h-10 hover:bg-secondary/50 cursor-pointer"
    :class="{ 'bg-gray-100': isEvenRow, 'bg-white': isOddRow }"
  >
    <td class="px-1 text-gray-600 w-[20px] truncate text-center">
      {{ expense.id }}
    </td>
    <td class="px-1 text-gray-600 text-right truncate">{{ expense.amount }}</td>
    <td>{{ expense.title }}</td>
    <td
      class="px-1 text-gray-600 text-right h-full py-1 lg:max-w-[300px] "
      data-content={{expense.description}}
    >
      {{ expense.description }}
    </td>
    <td class="px-1 text-gray-600 text-center  truncate ltr">
      {{ ISO8601DateToHumanDate(expense.created_at) }}
    </td>
    <td class="px-1 text-gray-600 text-center  truncate ltr">
      {{ ISO8601DateToHumanDate(expense.updated_at) }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { ISO8601DateToHumanDate } from "../services/helper/helperFunctions";

const props = defineProps(["expense"]);
const isEvenRow = computed(() => props.expense.id % 2 === 0);
const isOddRow = computed(() => props.expense.id % 2 !== 0);
</script>
