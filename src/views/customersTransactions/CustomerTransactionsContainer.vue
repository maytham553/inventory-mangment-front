<template>
  <div class="w-full flex flex-col gap-1">
    <button @click="openCreatePopup"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mb-2 max-w-xs px-4 rounded-lg">
      إضافة عملية
    </button>

    <div class="flex justify-between items-center gap-2 bg-gray-200 p-3 ">
      <div class="flex items-center gap-3">
        <label for="from">من</label>
        <input v-model="from" type="date" id="from" class="border-2 rounded-lg py-1 px-3" />
      </div>
      <div class="flex items-center gap-3">
        <label for="to">إلى</label>
        <input v-model="to" type="date" id="to" class="border-2 rounded-lg py-1 px-3" />
      </div>
      <button @click="fetchCustomerTransactionsWithDate(props.customerId, 1, from, to)"
        class="bg-green-500 hover:bg-green-700  text-white font-bold py-2 flex-1 max-w-xs px-4 rounded-lg">
        بحث
      </button>
    </div>
    <div class="flex justify-end items-center gap-2 bg-gray-200 p-3 ">
      <button @click="openPrintPopup"
        class="bg-green-500 hover:bg-green-700  text-white font-bold py-2 flex-1 max-w-xs px-4 rounded-lg">
        طباعة
      </button>
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
      :customerBalance="customerBalance" :customerId="customerId" :from="from" :to="to" :closeDialog="closePrintPopup" />
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
const from = ref("");
const to = ref("");
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
