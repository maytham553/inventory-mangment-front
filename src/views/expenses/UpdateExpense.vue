<template>
    <ExpenseForm :expense="expense" :status="status" :onSubmit="updateHandler" submitButtonText="تعديل" :disableAmount="true" />
</template>

<script setup lang="ts">
import { type Status, type Expense } from '../../Types';
import ExpenseForm from './ExpenseForm.vue';
import { useExpensesStore } from "../../stores";

const props = defineProps({
    expense: {
        type: Object as () => Expense,
        required: true,
    },
    onSuccess: {
        type: Function,
        required: false,
    },
});

const expensesStore = useExpensesStore();
const status: Status = expensesStore.expenseStatus;

const updateHandler = async (data: Expense) => {
    await expensesStore.updateExpense(data);
    if (props.onSuccess) {
        props.onSuccess();
    }
};
</script>
