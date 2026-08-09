<template>
  <div class="p-4 max-w-sm w-[30%] bg-gray-200 rounded-lg">
    <div>
      <span>id : </span>
      <span>{{ sale.id }}</span>
    </div>
    <div>
      <span>الأسم : </span>
      <span>{{ customerName }}</span>
    </div>
    <div>
      <span>التاريخ : </span>
      <span>{{ ISO8601DateToHumanDate(sale.created_at) }}</span>
    </div>
    <div>
      <span>الحالة : </span>
      <span>{{ convertPurchaseStatusToArabic(sale.status) }}</span>
    </div>

    <div class="flex justify-between gap-4 mt-5 items-center">
      <!-- A confirmed sale already moved the customer balance and the stock, so
           the API refuses to update it. Offer printing only. -->
      <button
        v-if="sale.status !== SaleStatus.Confirmed"
        @click="() => updateHandler(sale)"
        class="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
      >
         تعديل
      </button>
      <button
        @click="() => showHandler(sale)"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
       عرض
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { SaleStatus, type Sale } from "../Types";
import {
  ISO8601DateToHumanDate,
  convertPurchaseStatusToArabic,
} from "@/services/helper/helperFunctions";

const props = defineProps({
  sale: {
    type: Object as () => Sale,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  update: {
    type: Function,
    required: true,
  },
  show: {
    type: Function,
    required: true,
  },
});

const updateHandler = (sale: Sale) => {
  props.update(sale);
};

const showHandler = (sale: Sale) => {
  props.show(sale);
};
</script>
