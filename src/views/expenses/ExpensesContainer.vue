<template>
  <div class="container pt-10 pb-16">
    <div class="flex items-center mb-10 px-5 justify-between">
      <h1 class="text-4xl  text-right font-bold  text-secondary">
        الصرفيات
      </h1>

      <div class="w-1/3 flex gap-2 ">
        <button @click="openCreatePopup"
          class="bg-green-500 hover:bg-green-700 w-1/2  text-white font-bold py-2 px-4 rounded-lg w-30">
          إضافة عملية
        </button>
        <button @click="downloadReport"
          class="bg-blue-500 hover:bg-blue-700 w-1/2  text-white font-bold py-2 px-4 rounded-lg w-30">
          تحميل تقرير
        </button>
      </div>

    </div>
    <div class="flex items-center mb-10 px-5 justify-start gap-2 ">
      <div class="w-1/3">
        <Search :handleSearch="(page: number, search: string) => fetchExpenses(page, search, '', '')"
          placeholder="التسلسل ,العنوان" />
      </div>
    </div>
    <div class="mb-5">
      <DateFilter :filter="(from: string, to: string) => fetchExpenses(1, '', from, to)" />
    </div>

    <div v-if="expensesStatus.error" class="flex justify-center items-center h-full">
      <span class="text-red-500 text-center h-5">
        <span>{{ expensesStatus.message }}</span>
      </span>
    </div>

    <ExpensesList :expenses="expenses" />
    <div v-if="expensesStatus.success && !expenses.length" class="flex justify-center items-center mt-10 h-full">
      <span class="text-gray-500 text-center my-5 h-5">
        <span>لا يوجد تعاملات</span>
      </span>
    </div>
    <div v-if="expensesStatus.loading" class="flex justify-center items-center mt-10 h-full">
      <Loading stroke-color="#8f8f8f" />
    </div>
  </div>
  <div class="flex items-center w-full bg-white justify-center">
    <PaginationItems v-if="!expensesStatus.error" :currentPage="ExpensesStore.getExpensesPagination.currentPage"
      :totalPages="ExpensesStore.getExpensesPagination.lastPage" :goToPage="fetchExpenses" />
  </div>

  <EmptyDialog v-if="createPopup" title="إضافة" :onClose="closeCreatePopup" :closeDialog="closeCreatePopup">
    <CreateExpense />
  </EmptyDialog>
</template>

<script lang="ts" setup>
import CreateExpense from "./CreateExpense.vue";
import { useExpensesStore } from "../../stores";
import { onMounted, ref } from "vue";
import type { Expense } from "../../Types";
import EmptyDialog from "../../components/EmptyDialog.vue";
import { storeToRefs } from "pinia";
import PaginationItems from "../../components/PaginationItems.vue";
import Loading from "../../components/icons/Loading.vue";
import ExpensesList from "./ExpensesList.vue";
import Search from "@/components/Search.vue";
import DateFilter from "@/components/DateFilter.vue";

const ExpensesStore = useExpensesStore();
const createPopup = ref(false);
const expensesStatus = storeToRefs(ExpensesStore).expensesStatus;
const expenses = storeToRefs(ExpensesStore).expenses;
const searchText = ref('');
const fromDate = ref('');
const toDate = ref('');

const openCreatePopup = () => {
  createPopup.value = true;
};
const closeCreatePopup = () => {
  createPopup.value = false;
};

const fetchExpenses = async (page: number, search: string, from: string, to: string) => {
  searchText.value = search;
  fromDate.value = from;
  toDate.value = to;
  await ExpensesStore.fetchExpenses(page, search, from, to);
};

const downloadReport = async () => {
  await ExpensesStore.downloadReport(searchText.value, fromDate.value, toDate.value);
};

onMounted(async () => {
  await fetchExpenses(1, '', '', '');
});
</script>
