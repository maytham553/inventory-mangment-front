<template>
  <tr class="h-10" :class="{ 'bg-blue-100': isEvenRow, 'bg-blue-50': isOddRow }">
    <td class=" text-center">{{ expense.id }}</td>
    <td class=" ">{{ expense.amount }}</td>
    <td>{{ expense.title }}</td>
    <td class="  ">
      {{ expense.description || "N/A" }}
    </td>
    <td class="ltr">
      {{ ISO8601DateToHumanDate(expense.created_at) }}
    </td>
    <td class="ltr">
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
