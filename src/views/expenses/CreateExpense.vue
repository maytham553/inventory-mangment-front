<template>
    <ExpenseForm :status="status" :onSubmit="createHandler" submitButtonText="انشاء" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type Status, type Expense } from '../../Types';
import ExpenseForm from './ExpenseForm.vue';
import { useExpensesStore } from "../../stores";



const expensesStore = useExpensesStore();
const status = expensesStore.expenseStatus;
const createHandler = async (data: Expense) => {
    await expensesStore.createExpense(data);
    expensesStore.expense = {} as Expense;
}
</script>




