<template>
  <div class="flex flex-col pb-16 container items-center justify-around">
    <div class="bg-white rounded-lg py-4 z-50 w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ name }}</h2>
        <span :class="balanceClass">
          {{ formatCurrency(balance * -1) }}
          <button
            @click="
              () => {
                reCalculateBalance(id);
              }
            "
            type="button"
            class="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-full"
          >
            إعادة حساب الرصيد
          </button>
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
    </div>
    <div class="w-full mb-2">
      <div class="flex items-center flex-row justify-center gap-2">
        <button
          @click="() => changeActive('sales')"
          :class="{
            'bg-secondary hover:bg-primary text-white':
              operationNav.active === 'sales',
          }"
          class="px-4 py-2 bg-blue-200 hover:bg-blue-300 text-white rounded-lg"
        >
          مبيعات
        </button>
        <button
          @click="() => changeActive('transactions')"
          :class="{
            'bg-secondary hover:bg-primary text-white':
              operationNav.active === 'transactions',
          }"
          class="px-4 py-2 bg-blue-200 hover:bg-blue-300 text-white rounded-lg"
        >
          التعاملات
        </button>
      </div>

      <div class="mt-4 h-full" v-if="operationNav.active === 'transactions'">
        <CustomerTransactionContainer :customerId="id" :customerName="name" :customerBalance="balance" />
      </div>
      <div class="mt-4 h-full" v-if="operationNav.active === 'sales'">
        <SaleContainer :customerId="id" :customerName="name" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from "vue";
import CustomerTransactionContainer from "./../customersTransactions/CustomerTransactionsContainer.vue";
import SaleContainer from "./../sales/SaleContainer.vue";
import { formatCurrency } from "@/services/helper/helperFunctions";
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String || undefined,
    required: false,
  },
  balance: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  governorate: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  reCalculateBalance: {
    type: Function,
    required: true,
  },
});

const balanceClass = computed(() => {
  if (props.balance > 0) {
    return "bg-secondary text-white text-sm px-2 py-1 rounded-full";
  } else if (props.balance < 0) {
    return "bg-red-500 text-white text-sm px-2 py-1 rounded-full";
  } else {
    return "bg-gray-500 text-white text-sm px-2 py-1 rounded-full";
  }
});

const operationNav = ref({
  active: "sales",
  items: [
    {
      name: "التعاملات",
      value: "transactions",
    },
    {
      name: "مبيعات",
      value: "sales",
    },
  ],
});
const changeActive = (value: string) => {
  operationNav.value.active = value;
};
</script>
