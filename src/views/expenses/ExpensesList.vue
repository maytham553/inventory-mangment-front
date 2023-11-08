<template>
    <CardsContainer>
        <ExpenseCard v-for="expense in expenses" :key="expense.id" :id="expense.id" :amount="expense.amount"
            :title="expense.title" :description="expense.description ?? undefined"
            :created_at="ISO8601DateToHumanDate(expense.created_at!)"
            :updated_at="ISO8601DateToHumanDate(expense.updated_at!)" />
    </CardsContainer>
</template>

<script lang="ts" setup>
import CardsContainer from '../../components/CardsContainer.vue';
import ExpenseCard from '../../components/ExpenseCard.vue';
import { defineProps } from 'vue';
import type { Expense } from '../../Types';
import { ISO8601DateToHumanDate } from '../../services/helper/helperFunctions';

const props = defineProps({
    expenses: {
        type: Array as () => Expense[],
        required: true
    }
})
</script>