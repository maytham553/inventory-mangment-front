<template>
  <div class="container pt-8 pb-24 px-4 max-w-6xl mx-auto">
    <div class="flex flex-col gap-6 mb-8">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <h1 class="text-3xl md:text-4xl font-bold text-secondary text-right">
          الصرفيات
        </h1>
        <div class="flex flex-wrap gap-2 justify-end lg:justify-start">
          <button
            type="button"
            @click="openCreatePopup"
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-colors"
          >
            إضافة عملية
          </button>
          <button
            type="button"
            @click="downloadReport"
            :disabled="expensesStatus.loading"
            class="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-colors"
          >
            تحميل تقرير
          </button>
        </div>
      </div>

      <section
        class="rounded-2xl border border-slate-200/90 bg-white shadow-sm p-4 md:p-5 space-y-4"
        aria-label="تصفية الصرفيات"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 class="text-lg font-bold text-slate-800 text-right">تصفية النتائج</h2>
          <button
            v-if="hasAnyFilter"
            type="button"
            @click="clearAllFilters"
            class="text-sm font-semibold text-sky-700 hover:text-sky-900 self-end sm:self-auto"
          >
            مسح كل الفلاتر
          </button>
        </div>

        <div
          v-if="hasAnyFilter"
          class="flex flex-wrap gap-2 justify-start"
        >
          <span
            v-if="listSearch.trim()"
            class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold py-1.5 px-3 border border-slate-200"
          >
            بحث: {{ listSearch }}
            <button
              type="button"
              class="text-slate-500 hover:text-slate-800 font-bold leading-none"
              aria-label="إزالة البحث"
              @click="removeSearchFilter"
            >
              ×
            </button>
          </span>
          <span
            v-if="listFrom || listTo"
            class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold py-1.5 px-3 border border-slate-200"
          >
            التاريخ: {{ dateRangeLabel }}
            <button
              type="button"
              class="text-slate-500 hover:text-slate-800 font-bold leading-none"
              aria-label="إزالة التاريخ"
              @click="removeDateFilter"
            >
              ×
            </button>
          </span>
        </div>

        <Search
          :handle-search="onSearch"
          :model-value="listSearch"
          placeholder="ابحث برقم السجل أو العنوان أو الوصف…"
        />

        <DateFilter
          default-range="none"
          :filter="onDateFilter"
        />
      </section>
    </div>

    <div v-if="expensesStatus.error" class="flex justify-center items-center py-12">
      <span class="text-red-600 text-center">{{ expensesStatus.message }}</span>
    </div>

    <div v-else class="relative min-h-[200px]">
      <div
        v-if="expensesStatus.loading"
        class="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/75 backdrop-blur-[1px]"
      >
        <Loading stroke-color="#64748b" />
      </div>
      <ExpensesList
        v-if="expenses.length"
        :expenses="expenses"
        :can-edit="isSuperAdmin"
        @edit="openUpdatePopup"
      />
      <div
        v-else-if="expensesStatus.success && !expenses.length"
        class="flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/80"
      >
        <p class="text-slate-500 text-center text-lg font-medium">
          {{ hasAnyFilter ? "لا توجد تعاملات مطابقة" : "لا يوجد تعاملات" }}
        </p>
        <p
          v-if="hasAnyFilter"
          class="text-slate-400 text-sm mt-2 text-center max-w-md"
        >
          جرّب تعديل البحث أو نطاق التاريخ، أو اضغط «مسح كل الفلاتر».
        </p>
      </div>
    </div>
  </div>

  <div class="flex items-center w-full bg-white justify-center pb-8">
    <PaginationItems
      v-if="
        !expensesStatus.error &&
        expensesStatus.success &&
        expensesPagination.lastPage > 0
      "
      :current-page="expensesPagination.currentPage"
      :total-pages="expensesPagination.lastPage"
      :go-to-page="(page: number) => ExpensesStore.fetchExpenses(page)"
    />
  </div>

  <EmptyDialog
    v-if="createPopup"
    title="إضافة"
    :on-close="closeCreatePopup"
    :close-dialog="closeCreatePopup"
  >
    <CreateExpense />
  </EmptyDialog>
  <EmptyDialog
    v-if="updatePopup"
    title="تعديل"
    :on-close="closeUpdatePopup"
    :close-dialog="closeUpdatePopup"
  >
    <UpdateExpense :expense="selectedExpense" :on-success="closeUpdatePopup" />
  </EmptyDialog>
</template>

<script lang="ts" setup>
import CreateExpense from "./CreateExpense.vue";
import UpdateExpense from "./UpdateExpense.vue";
import { useAuthStore, useExpensesStore } from "../../stores";
import { computed, onMounted, ref } from "vue";
import type { Expense } from "../../Types";
import EmptyDialog from "../../components/EmptyDialog.vue";
import { storeToRefs } from "pinia";
import PaginationItems from "../../components/PaginationItems.vue";
import Loading from "../../components/icons/Loading.vue";
import ExpensesList from "./ExpensesList.vue";
import Search from "@/components/Search.vue";
import DateFilter from "@/components/DateFilter.vue";

const ExpensesStore = useExpensesStore();
const isSuperAdmin = useAuthStore().isSuperAdmin;
const createPopup = ref(false);
const updatePopup = ref(false);
const selectedExpense = ref({} as Expense);

const { expensesStatus, expenses, expensesPagination, listSearch, listFrom, listTo } =
  storeToRefs(ExpensesStore);

const hasAnyFilter = computed(() => {
  return (
    !!listSearch.value.trim() ||
    !!listFrom.value ||
    !!listTo.value
  );
});

const dateRangeLabel = computed(() => {
  const f = listFrom.value;
  const t = listTo.value;
  if (f && t) return `${f} → ${t}`;
  if (f) return `من ${f}`;
  if (t) return `حتى ${t}`;
  return "";
});

const onSearch = (page: number, search: string) => {
  ExpensesStore.fetchExpenses(page, search);
};

const onDateFilter = (from: string, to: string) => {
  ExpensesStore.fetchExpenses(1, undefined, from, to);
};

const clearAllFilters = () => {
  ExpensesStore.resetExpenseListFilters();
};

const removeSearchFilter = () => {
  ExpensesStore.fetchExpenses(1, "");
};

const removeDateFilter = () => {
  ExpensesStore.fetchExpenses(1, undefined, "", "");
};

const openCreatePopup = () => {
  createPopup.value = true;
};
const closeCreatePopup = () => {
  createPopup.value = false;
};
const openUpdatePopup = (expense: Expense) => {
  if (!isSuperAdmin) {
    return;
  }
  selectedExpense.value = expense;
  updatePopup.value = true;
};
const closeUpdatePopup = () => {
  updatePopup.value = false;
  selectedExpense.value = {} as Expense;
};

const downloadReport = async () => {
  await ExpensesStore.downloadReport();
};

onMounted(async () => {
  await ExpensesStore.fetchExpenses(1);
});
</script>
