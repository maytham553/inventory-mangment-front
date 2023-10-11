<template>
    <button @click="openCreatePopup" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        إضافة عملية
    </button>
    <div v-if="supplierTransactionsStatus.loading" class="flex justify-center items-center h-full">
        <Loading stroke-color="#8f8f8f" />
    </div>
    <div v-if="supplierTransactionsStatus.error" class="flex justify-center items-center h-full">
        <span class="text-red-500 text-center h-5 ">
            <span>{{ supplierTransactionsStatus.message }}</span>
        </span>
    </div>
    <div v-if="supplierTransactionsStatus.success && !supplierTransactions.length"
        class="flex justify-center items-center h-full">
        <span class="text-gray-500 text-center h-5 ">
            <span>لا يوجد تعاملات</span>
        </span>
    </div>
    <SupplierTransactionsList :transactions="supplierTransactions" />
    <PaginationItems v-if="!supplierTransactionsStatus.error"
        :currentPage="SupplierTransactionsStore.getSupplierTransactionsPagination.currentPage"
        :totalPages="SupplierTransactionsStore.getSupplierTransactionsPagination.lastPage"
        :goToPage="(page: number) => { SupplierTransactionsStore.fetchSupplierTransactionsBySupplierId(props.supplierId, page) }" />
    <EmptyDialog v-if="createPopup" title="إضافة" :onClose="closeCreatePopup" :closeDialog="closeCreatePopup">
        <CreateSupplierTransaction :createTransaction="createTransaction" :status="supplierTransactionStatus"
            :supplierId="supplierId" />
    </EmptyDialog>
</template>

<script lang="ts" setup >
import SupplierTransactionsList from './SupplierTransactionsList.vue';
import CreateSupplierTransaction from './CreateSupplierTransaction.vue';
import { useSupplierTransactionsStore } from '../../stores'
import { onMounted, ref } from 'vue';
import type { SupplierTransaction } from '../../Types';
import { defineProps } from 'vue'
import EmptyDialog from '@/components/EmptyDialog.vue';
import { storeToRefs } from 'pinia';
import PaginationItems from '@/components/PaginationItems.vue';
import Loading from '@/components/icons/Loading.vue';

const props = defineProps({
    supplierId: {
        type: Number,
        required: true
    }
})

const SupplierTransactionsStore = useSupplierTransactionsStore()
const createPopup = ref(false);
const supplierTransactionStatus = storeToRefs(SupplierTransactionsStore).supplierTransactionStatus;
const supplierTransactionsStatus = storeToRefs(SupplierTransactionsStore).supplierTransactionsStatus;
const supplierTransactions = storeToRefs(SupplierTransactionsStore).supplierTransactions;

const openCreatePopup = () => {
    createPopup.value = true;
}
const closeCreatePopup = () => {
    createPopup.value = false;
}

const createTransaction = async (data: SupplierTransaction) => {
    await SupplierTransactionsStore.createSupplierTransaction(data);
    createPopup.value = false;
}

onMounted(async () => {
    await SupplierTransactionsStore.fetchSupplierTransactionsBySupplierId(props.supplierId, 1);
});

</script>