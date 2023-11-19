<template>
    <div class="min-h-full flex flex-col  justify-between ">
        <div class="w-full h-full flex flex-col gap-20">
            <div class="flex flex-col justify-center items-center gap-5 ">
            <div class=" w-full flex mt-4 justify-center items-center  ">
                <div class="w-1/2" >
                    <Search :handleSearch="fetchExpenses" placeholder="التسلسل ,العنوان" />
                </div>
                <button @click="openCreatePopup"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mt-4 px-4 rounded-lg w-30">
                    إضافة عملية
                </button>
            </div>
            <div v-if="expensesStatus.loading" class="flex justify-center items-center h-full">
                <Loading stroke-color="#8f8f8f" />
            </div>
            <div v-if="expensesStatus.error" class="flex justify-center items-center h-full">
                <span class="text-red-500 text-center h-5 ">
                    <span>{{ expensesStatus.message }}</span>
                </span>
            </div>
        </div>

        <div v-if="expensesStatus.success && !expenses.length" class="flex justify-center items-center h-full">
            <span class="text-gray-500 text-center h-5 ">
                <span>لا يوجد تعاملات</span>
            </span>
        </div>
        <ExpensesList :expenses="expenses" />

        </div>
    
        <PaginationItems v-if="!expensesStatus.error" :currentPage="ExpensesStore.getExpensesPagination.currentPage"
            :totalPages="ExpensesStore.getExpensesPagination.lastPage" :goToPage="fetchExpenses" />
        <EmptyDialog v-if="createPopup" title="إضافة" :onClose="closeCreatePopup" :closeDialog="closeCreatePopup">
            <CreateExpense :createExpense="createExpense" :status="expenseStatus" />
        </EmptyDialog>
    </div>






</template>

<script lang="ts" setup >
import CreateExpense from './CreateExpense.vue';
import { useExpensesStore } from '../../stores'
import { onMounted, ref } from 'vue';
import type { Expense } from '../../Types';
import EmptyDialog from '../../components/EmptyDialog.vue';
import { storeToRefs } from 'pinia';
import PaginationItems from '../../components/PaginationItems.vue';
import Loading from '../../components/icons/Loading.vue';
import ExpensesList from './ExpensesList.vue';
import Search from '@/components/Search.vue';

const ExpensesStore = useExpensesStore()
const createPopup = ref(false);
const expenseStatus = storeToRefs(ExpensesStore).expenseStatus;
const expensesStatus = storeToRefs(ExpensesStore).expensesStatus;
const expenses = storeToRefs(ExpensesStore).expenses;
const fetchExpenses = ExpensesStore.fetchExpenses;

const openCreatePopup = () => {
    createPopup.value = true;
}
const closeCreatePopup = () => {
    createPopup.value = false;
}

const createExpense = async (data: Expense) => {
    await ExpensesStore.createExpense(data);
    createPopup.value = false;
}

onMounted(async () => {
    await fetchExpenses(1);
});

</script>