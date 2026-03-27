<template>
  <div class="mb-4 h-auto overflow-y-auto shadow-md bg-gray-200 rounded-xl">
    <table class="w-full divide-y divide-gray-100 text-xs font-bold">
      <thead>
        <tr>
          <th class="pr-2 px-3 py-4 font-semibold text-gray-400  w-[20px]">التسلسل</th>
          <th class="px-3 py-4 font-semibold text-gray-400 text-right">المقدار</th>
          <th class="px-3 py-4 font-semibold text-gray-400 text-right">العنوان</th>
          <th class="px-3 py-4 font-semibold text-gray-400 text-right">الوصف</th>
          <th class="px-3 py-4 font-semibold text-gray-400 text-center ">تاريخ الانشاء</th>
          <th class="px-3 py-4 font-semibold text-gray-400 text-center ">تاريخ التحديث</th>
          <th v-if="canEdit" class="px-3 py-4 font-semibold text-gray-400 text-center ">عمليات</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <ExpenseTableRow
          v-for="expense in reversedExpenses"
          :key="expense.id"
          :expense="expense"
          :canEdit="canEdit"
          @edit="(expense: Expense) => emit('edit', expense)"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import ExpenseTableRow from "../../components/ExpenseTableRow.vue";
import { computed } from "vue";
import type { Expense } from "../../Types";

const props = defineProps({
  expenses: {
    type: Array as () => Expense[],
    required: true,
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{
  (e: "edit", expense: Expense): void
}>();

const reversedExpenses = computed(() => [...props.expenses].reverse());
</script>
