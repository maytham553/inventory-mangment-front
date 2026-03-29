<template>
  <div class="mb-4 h-auto overflow-x-auto overflow-y-auto shadow-md bg-white rounded-xl border border-slate-200/80">
    <table class="w-full divide-y divide-slate-100 text-xs font-bold min-w-[640px]">
      <thead>
        <tr>
          <th class="pr-2 px-3 py-4 font-semibold text-slate-500 w-[20px]">التسلسل</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-right">المقدار</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-right">العنوان</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-right">الوصف</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-center">تاريخ الانشاء</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-center">تاريخ التحديث</th>
          <th v-if="canEdit" class="px-3 py-4 font-semibold text-slate-500 text-center">عمليات</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
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
