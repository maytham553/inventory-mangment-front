<template>
    <CustomerTransactionForm  :status="status" :onSubmit="createHandler"
        submitButtonText="انشاء" />
</template>

<script setup lang="ts">
import { defineProps, ref, type Ref } from 'vue';
import { type Status, type CustomerTransaction } from '../../Types';
import CustomerTransactionForm from './CustomerTransactionForm.vue';

const props = defineProps({
    customerId: {
        type: Number,
        required: true,
    },
    status: {
        type: Object as () => Status,
        required: true,
    },
    createTransaction: {
        type: Function,
        required: true,
    },
});

const createHandler = async (data: CustomerTransaction) => {
    data.customer_id = props.customerId;
    await props.createTransaction(data);
};
</script>




