<template>
    <form @submit.prevent="handleSubmit" class="w-full h-full flex justify-center flex-col items-center">
        <div class="bg-gray-100 p-5 rounded-2xl">
            <div class="mb-4">
                <label for="transaction_type" class="block text-gray-700 m-1"> نوع التعامل </label>
                <select id="transaction_type" v-model="formData.type" required class="form-select w-full p-1 rounded-lg">
                    <option value="" disabled>اختر نوع التعامل</option>
                    <option v-for="transactionType in TransactionType" :key="transactionType" :value="transactionType">
                        {{ convertTransactionTypeToArabic(transactionType) }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label for="name" class="block text-gray-700 m-1">المبلغ</label>
                <input type="number" id="amount" v-model="formData.amount" required
                    class="form-input w-full p-1 rounded-lg" />
            </div>

            <div class="mb-4">
                <label for="note" class="block text-gray-700 m-1">ملاحظة</label>
                <textarea id="note" v-model="formData.note" class="form-textarea w-full p-1 rounded-lg"></textarea>
            </div>
            <div class="mb-4">
                <span v-if="status.error" class="text-red-500 text-center h-5 ">
                    <span>{{ status.message }}</span>
                </span>
            </div>
            <div class="mb-4">
                <button type="submit"
                    class="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded w-full flex justify-center gap-3"
                    :class="{ 'bg-blue-300': status.loading }" :disabled="status.loading">
                    {{ submitButtonText }}
                    <Loading v-if="status.loading" class="-mr-1 ml-3" />
                </button>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { TransactionType, type Status, type SupplierTransaction } from '../../Types';
import Loading from '../../components/icons/Loading.vue';
import { convertTransactionTypeToArabic } from '@/services/helper/helperFunctions';


const props = defineProps({
    transaction: {
        type: Object as () => SupplierTransaction,
        required: false
    },
    status: {
        type: Object as () => Status,
        required: true,
    },
    onSubmit: {
        type: Function,
        required: true,
    },
    submitButtonText: {
        type: String,
        required: true,
    },
});

const formData = props.transaction ? ref({ ...props.transaction }) : ref({
    type: TransactionType.CREDIT,
    amount: null,
    note: ''
});

const handleSubmit = async () => {
    await props.onSubmit(formData.value);
    formData.value = { ...props.transaction } as SupplierTransaction;
};
</script>