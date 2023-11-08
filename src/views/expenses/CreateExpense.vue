<template>
    <ExpenseForm :status="status" :onSubmit="createHandler" submitButtonText="انشاء" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type Status, type Expense } from '../../Types';
import ExpenseForm from './ExpenseForm.vue';

const props = defineProps({
    status: {
        type: Object as () => Status,
        required: true,
    },
    createExpense: {
        type: Function,
        required: true,
    },
});

const createHandler = async (data: Expense) => {
    await props.createExpense(data);
};
</script>




