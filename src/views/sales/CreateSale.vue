<template>
  <div class="flex gap-5 h-full w-full overflow-hidden">
    <SaleForm
      class="w-3/4 h-full"
      :sale="sale"
      :status="saleStatus"
      :removeItem="removeItem"
      :onSubmit="onSubmit"
      submitButtonText="حفظ"
      :reCalculateSaleAfterChange="reCalculateSaleAfterChange"
      :print="print"
      :clearForm="clearForm"
    />
    <SaleProductList
      class="w-1/4 h-full overflow-auto"
      :products="products"
      :status="productsStatus"
      :addItem="addItem"
      :removeItem="removeItem"
      :searchProducts="searchProducts"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { Sale, Product, Status } from "../../Types";
import SaleProductList from "./SaleProductList.vue";
import SaleForm from "./SaleForm.vue";

const props = defineProps({
  sale: {
    type: Object as () => Sale,
    required: true,
  },
  saleStatus: {
    type: Object as () => Status,
    required: true,
  },
  products: {
    type: Array as () => Product[],
    required: true,
  },
  productsStatus: {
    type: Object as () => Status,
    required: true,
  },
  addItem: {
    type: Function,
    required: true,
  },
  removeItem: {
    type: Function,
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
  reCalculateSaleAfterChange: {
    type: Function,
    required: true,
  },
  print: {
    type: Function,
    required: true,
  },
  closeDialog: {
    type: Function,
    required: false,
    default: () => {},
  },
  clearForm: {
    type: Function,
    required: false,
    default: () => {},
  },
  searchProducts: {
    type: Function,
    required: true,
  },
});
</script>
