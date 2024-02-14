<template>
  <div class="w-full flex flex-col gap-1">
    <button @click="openCreatePopup"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mb-2 max-w-xs px-4 rounded-lg">
      إضافة عملية
    </button>
    <DateFilter
      :filter="(from: string, to: string) => fetchSupplierTransactionsWithDate(props.supplierId, 1, from, to)" />
    <div class="flex flex-col items-end gap-2 bg-gray-200 p-3 ">
      <button @click="openPrintPopup"
        class="bg-green-500 hover:bg-green-700  text-white font-bold py-2 w-full max-w-xs px-4 rounded-lg">
        طباعة
      </button>
      <p class="text-gray-600 text-xs">ملاحظة: يمكن طباعة 200 صف فقط</p>
    </div>
    <div v-if="supplierTransactionsStatus.loading" class="flex justify-center items-center h-full">
      <Loading stroke-color="#8f8f8f" />
    </div>
    <div v-if="supplierTransactionsStatus.error" class="flex justify-center items-center h-full">
      <span class="text-red-500 text-center h-5">
        <span>{{ supplierTransactionsStatus.message }}</span>
      </span>
    </div>
    <div v-if="supplierTransactionsStatus.success && !supplierTransactions.length"
      class="flex justify-center items-center h-full">
      <span class="text-gray-500 text-center my-5 h-5">
        <span>لا يوجد تعاملات</span>
      </span>
    </div>
    <SupplierTransactionsList :transactions="supplierTransactions" />
    <div class="w-full items-center justify-center flex">
      <PaginationItems v-if="!supplierTransactionsStatus.error"
        :currentPage="SupplierTransactionsStore.getSupplierTransactionsPagination.currentPage"
        :totalPages="SupplierTransactionsStore.getSupplierTransactionsPagination.lastPage"
        :goToPage="(page: number) => { SupplierTransactionsStore.fetchSupplierTransactionsBySupplierId(props.supplierId, page) }" />
    </div>
    <EmptyDialog v-if="createPopup" title="إضافة" :onClose="closeCreatePopup" :closeDialog="closeCreatePopup">
      <CreateSupplierTransaction :createTransaction="createTransaction" :status="supplierTransactionStatus"
        :supplierId="supplierId" />
    </EmptyDialog>
    <EmptyDialog v-if="printPopup" :close-dialog="closePrintPopup" title="طباعة">
      <SupplierTransactionsPrint :supplierTransactions="supplierTransactions" :supplierName="supplierName"
        :supplierBalance="supplierBalance" :supplierId="supplierId" :from="fromDate" :to="toDate"
        :closeDialog="closePrintPopup" />
    </EmptyDialog>
  </div>
</template>

<script lang="ts" setup>
import SupplierTransactionsList from "./SupplierTransactionsList.vue";
import CreateSupplierTransaction from "./CreateSupplierTransaction.vue";
import { useSupplierTransactionsStore } from "../../stores";
import { onMounted, ref } from "vue";
import type { SupplierTransaction } from "../../Types";
import { defineProps } from "vue";
import EmptyDialog from "@/components/EmptyDialog.vue";
import { storeToRefs } from "pinia";
import PaginationItems from "@/components/PaginationItems.vue";
import Loading from "@/components/icons/Loading.vue";
import DateFilter from "@/components/DateFilter.vue";
import SupplierTransactionsPrint from "./SupplierTransactionsPrint.vue";

const props = defineProps({
  supplierId: {
    type: Number,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  supplierBalance: {
    type: Number,
    required: true,
  },
});
const printPopup = ref();
const fromDate = ref("");
const toDate = ref("");
const SupplierTransactionsStore = useSupplierTransactionsStore();
const createPopup = ref(false);
const supplierTransactionStatus = storeToRefs(
  SupplierTransactionsStore
).supplierTransactionStatus;
const supplierTransactionsStatus = storeToRefs(
  SupplierTransactionsStore
).supplierTransactionsStatus;
const supplierTransactions = storeToRefs(
  SupplierTransactionsStore
).supplierTransactions;

const openCreatePopup = () => {
  createPopup.value = true;
};
const closeCreatePopup = () => {
  createPopup.value = false;
};

const createTransaction = async (data: SupplierTransaction) => {
  await SupplierTransactionsStore.createSupplierTransaction(data);
  createPopup.value = false;
};

const closePrintPopup = () => {
  printPopup.value = false;
};
const openPrintPopup = () => {
  printPopup.value = true;
};

const fetchSupplierTransactionsWithDate = async (customerId: number, page: number, from: string, to: string) => {
  fromDate.value = from;
  toDate.value = to;
  await SupplierTransactionsStore.fetchSupplierTransactionsBySupplierIdWithDate(
    customerId,
    page,
    from,
    to
  )
}



onMounted(async () => {
  await fetchSupplierTransactionsWithDate(props.supplierId, 1, '', '');
});
</script>
