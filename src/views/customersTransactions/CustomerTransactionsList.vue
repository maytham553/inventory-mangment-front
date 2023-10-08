<template>
    <CardsContainer>
        <TransactionCard v-for="transaction in transactions" :key="transaction.id" :id="transaction.id"
            :type="convertTransactionTypeToArabic(transaction.type)" :amount="transaction.amount"
            :note="transaction.note ?? undefined" :created_at="ISO8601DateToHumanDate(transaction.created_at!)"
            :updated_at="ISO8601DateToHumanDate(transaction.updated_at!)" />
    </CardsContainer>
</template>

<script lang="ts" setup>
import CardsContainer from '../../components/CardsContainer.vue';
import TransactionCard from '../../components/TransactionCard.vue';
import { defineProps } from 'vue';
import type { CustomerTransaction } from '../../Types';
import { ISO8601DateToHumanDate, convertTransactionTypeToArabic } from '../../services/helper/helperFunctions';

const props = defineProps({
    transactions: {
        type: Array as () => CustomerTransaction[],
        required: true
    }
})
</script>