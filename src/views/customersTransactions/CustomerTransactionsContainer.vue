<template>
  <div class="w-full flex flex-col gap-1">
    <button @click="openCreatePopup"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mb-2 max-w-xs px-4 rounded-lg">
      إضافة عملية
    </button>
    <DateFilter
      :filter="(from: string, to: string) => fetchCustomerTransactionsWithDate(props.customerId, 1, from, to)" />
    <div class="flex flex-col items-end gap-2 bg-gray-200 p-3 ">
      <button @click="openPrintPopup"
        class="bg-green-500 hover:bg-green-700  text-white font-bold py-2 w-full max-w-xs px-4 rounded-lg">
        طباعة
      </button>
      <p class="text-gray-600 text-xs">ملاحظة: يمكن طباعة 200 صف فقط</p>
    </div>
    <div v-if="customerTransactionsStatus.loading" class="flex justify-center items-center h-full">
      <Loading stroke-color="#8f8f8f" />
    </div>
    <div v-if="customerTransactionsStatus.error" class="flex justify-center items-center h-full">
      <span class="text-red-500 text-center h-5">
        <span>{{ customerTransactionsStatus.message }}</span>
      </span>
    </div>
    <div v-if="customerTransactionsStatus.success && !customerTransactions.length"
      class="flex justify-center items-center h-full">
      <span class="text-gray-500 text-center h-5 my-5">
        <span>لا يوجد تعاملات</span>
      </span>
    </div>
    <CustomerTransactionsList :transactions="customerTransactions" />
    <div class="w-full items-center justify-center flex">
      <PaginationItems v-if="!customerTransactionsStatus.error" :currentPage="CustomerTransactionsStore.getCustomerTransactionsPagination
        .currentPage
        " :totalPages="CustomerTransactionsStore.getCustomerTransactionsPagination.lastPage" :goToPage="(page: number) => {
    CustomerTransactionsStore.fetchCustomerTransactionsWithDate(props.customerId, page, from, to)
  }" />
    </div>
    <EmptyDialog v-if="createPopup" title="إضافة" :onClose="closeCreatePopup" :closeDialog="closeCreatePopup">
      <CreateCustomerTransaction :createTransaction="createTransaction" :status="customerTransactionStatus"
        :customerId="customerId" />
    </EmptyDialog>
  </div>
  <EmptyDialog v-if="printPopup" :close-dialog="closePrintPopup" title="طباعة">
    <CustomerTransactionsPrint :customerTransactions="customerTransactions" :customerName="customerName"
      :customerBalance="customerBalance" :customerId="customerId" :from="fromDate" :to="toDate"
      :closeDialog="closePrintPopup" />
  </EmptyDialog>
</template>

<script lang="ts" setup>
import CustomerTransactionsList from "./CustomerTransactionsList.vue";
import CreateCustomerTransaction from "./CreateCustomerTransaction.vue";
import { useCustomerTransactionsStore } from "../../stores";
import { onMounted, ref } from "vue";
import type { CustomerTransaction } from "../../Types";
import { defineProps } from "vue";
import EmptyDialog from "../../components/EmptyDialog.vue";
import { storeToRefs } from "pinia";
import PaginationItems from "../../components/PaginationItems.vue";
import Loading from "../../components/icons/Loading.vue";
import CustomerTransactionsPrint from "./CustomerTransactionsPrint.vue";
import DateFilter from "@/components/DateFilter.vue";

const props = defineProps({
  customerId: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerBalance: {
    type: Number,
    required: true,
  },
});
const printPopup = ref();
const fromDate = ref("");
const toDate = ref("");
const CustomerTransactionsStore = useCustomerTransactionsStore();
const createPopup = ref(false);
const customerTransactionStatus = storeToRefs(
  CustomerTransactionsStore
).customerTransactionStatus;
const customerTransactionsStatus = storeToRefs(
  CustomerTransactionsStore
).customerTransactionsStatus;
const customerTransactions = storeToRefs(
  CustomerTransactionsStore
).customerTransactions;

const openCreatePopup = () => {
  createPopup.value = true;
};
const closeCreatePopup = () => {
  createPopup.value = false;
};

const createTransaction = async (data: CustomerTransaction) => {
  await CustomerTransactionsStore.createCustomerTransaction(data);
  createPopup.value = false;
};

const closePrintPopup = () => {
  printPopup.value = false;
};
const openPrintPopup = () => {
  printPopup.value = true;
};

const fetchCustomerTransactionsWithDate = async (customerId: number, page: number, from: string, to: string) => {
  fromDate.value = from;
  toDate.value = to;
  await CustomerTransactionsStore.fetchCustomerTransactionsWithDate(
    customerId,
    page,
    from,
    to
  )
}

onMounted(async () => {
  await fetchCustomerTransactionsWithDate(props.customerId, 1, from.value, to.value);
});
</script>
