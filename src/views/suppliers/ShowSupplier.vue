<template>
    <div class="bg-white shadow-lg rounded-lg p-4 w-full  ">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">{{ name }}</h2>
            <span class="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                {{ balance }}
            </span>
        </div>
        <div class="text-gray-600 mb-2">
            <p v-if="email">البريد الإلكتروني: {{ email }}</p>
            <p>الهاتف: {{ phone }}</p>
            <p>المحافظة: {{ governorate }}</p>
            <p>العنوان: {{ address }}</p>
        </div>
        <div v-if="note" class="mt-2">
            <p class="text-gray-700 font-semibold">ملاحظة:</p>
            <p>{{ note }}</p>
        </div>
        <div class="mt-4 " v-if="id">
            <h2 class="text-xl font-semibold">التعاملات</h2>
            <div class="h-96 overflow-auto  ">
                <SupplierTransactionsContainer :supplierId="id" />
            </div>
        </div>
    </div>
</template>
  
<script lang="ts"  setup>
import { defineProps } from 'vue';
import SupplierTransactionsContainer from './../suppliersTransactions/SupplierTransactionsContainer.vue';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String || undefined,
        required: false
    },
    balance: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    governorate: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    }
});


</script>