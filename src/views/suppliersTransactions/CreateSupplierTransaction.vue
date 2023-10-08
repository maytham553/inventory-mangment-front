<template>
    <SupplierTransactionForm  :status="status" :onSubmit="createHandler"
        submitButtonText="انشاء" />
</template>

<script setup lang="ts">
import { defineProps, ref, type Ref } from 'vue';
import { type Status, type SupplierTransaction } from '../../Types';
import SupplierTransactionForm from './SupplierTransactionForm.vue';

const props = defineProps({
    supplierId: {
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

const createHandler = async (data: SupplierTransaction) => {
    data.supplier_id = props.supplierId;
    await props.createTransaction(data);
};
</script>




