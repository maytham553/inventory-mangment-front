<template>
  <tr
    class="h-10 hover:bg-secondary/50"
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
      {{ ISO8601DateToHumanDate(expense.created_at || "") }}
    </td>
    <td class="px-1 text-gray-600 text-center  truncate ltr">
      {{ ISO8601DateToHumanDate(expense.updated_at || "") }}
    </td>
    <td v-if="canEdit" class="px-1 text-center">
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
        @click="$emit('edit', expense)"
      >
        تعديل
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ISO8601DateToHumanDate } from "../services/helper/helperFunctions";
import type { Expense } from "../Types";

const props = defineProps({
  expense: {
    type: Object as () => Expense,
    required: true,
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
});
defineEmits<{
  (e: "edit", expense: Expense): void
}>();
const isEvenRow = computed(() => (props.expense.id || 0) % 2 === 0);
const isOddRow = computed(() => (props.expense.id || 0) % 2 !== 0);
</script>
