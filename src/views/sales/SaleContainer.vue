<template>
  <div class="h-full w-full flex flex-col justify-between  items-center">
   
    <div class="flex flex-col justify-center items-center w-full">
      <div class="flex justify-center items-center gap-5 w-full">
        <div class="w-full">
          <Search
            :handleSearch="(page = 1, search: string) => { fetchSalesOfCustomer(page, props.customerId, search) }"
            placeholder="التسلسل"
          />
        </div>
        <button
          @click="openCreatePopup"
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          إضافة
        </button>
      </div>

      <div class="flex justify-center items-center w-full">
        <div
          v-if="salesStatus.loading || productsStatus.loading"
          class="flex justify-center items-center m-10"
        >
          <Loading stroke-color="#8f8f8f" />
        </div>
        <div
          v-if="salesStatus.error || productsStatus.error"
          class="text-red-500 text-sm flex justify-center items-center m-10"
        >
          {{ salesStatus.message || productsStatus.message }}
        </div>
        <div
          v-if="salesStatus.success && !salesStore.sales.length"
          class="flex justify-center items-center m-10"
        >
          <h1 class="text-2xl text-gray-500">لا يوجد فواتير بيع</h1>
        </div>
      </div>
    </div>

    <SalesList
      v-if="salesStatus.success && productsStatus.success"
      :sales="salesStore.sales"
      :customerName="customerName"
      :update="openUpdatePopup"
      :show="() => {}"
    />

    <EmptyDialog
      v-if="createPopup"
      :title="String(customerId)"
      :close-dialog="closeCreatePopup"
    >
      <CreateSale
        v-if="createPopup"
        :sale="salesStore.sale"
        :saleStatus="saleStatus"
        :products="products"
        :productsStatus="productsStatus"
        :addItem="addItem"
        :removeItem="removeItem"
        :onSubmit="createSale"
        submitButtonText="حفظ"
        :reCalculateSaleAfterChange="salesStore.reCalculateSaleAfterChange"
        :print="openPrintPopup"
        :clearForm="salesStore.setInitialSale"
      />
    </EmptyDialog>

    <EmptyDialog
      v-if="updatePopup"
      :title="String(customerId)"
      :close-dialog="closeUpdatePopup"
    >
      <UpdateSale
        v-if="updatePopup"
        :sale="salesStore.sale"
        :saleStatus="saleStatus"
        :products="products"
        :productsStatus="productsStatus"
        :addItem="addItem"
        :removeItem="removeItem"
        :onSubmit="updateSale"
        submitButtonText="تعديل"
        :reCalculateSaleAfterChange="salesStore.reCalculateSaleAfterChange"
        :print="openPrintPopup"
        :closeDialog="closeUpdatePopup"
      />
    </EmptyDialog>

    <EmptyDialog
      v-if="printPopup"
      :title="customerName"
      :close-dialog="closePrintPopup"
    >
      <SalePrint
        :sale="sale"
        :customer="customer"
        :closeDialog="closePrintPopup"
      />
    </EmptyDialog>

    <PaginationItems
      v-if="
        salesStatus.success && salesStore.sales.length && productsStatus.success
      "
      :currentPage="pagination.currentPage"
      :totalPages="pagination.lastPage"
      :goToPage="(page: number) => { salesStore.fetchSalesOfCustomer(page, props.customerId) }"
    />
  </div>
</template>

<script lang="ts" setup>
import CreateSale from "./CreateSale.vue";
import {
  useSalesStore,
  useProductsStore,
  useCustomersStore,
} from "../../stores";
import { onMounted, ref, defineProps } from "vue";
import type { Sale, Product } from "../../Types";
import Loading from "../../components/icons/Loading.vue";
import EmptyDialog from "../../components/EmptyDialog.vue";
import { storeToRefs } from "pinia";
import SalesList from "./SalesList.vue";
import UpdateSale from "./UpdateSale.vue";
import PaginationItems from "../../components/PaginationItems.vue";
import Search from "@/components/Search.vue";
import router from "@/router";
import SalePrint from "./SalePrint.vue";

const salesStore = useSalesStore();
const productsStore = useProductsStore();
const customersStore = useCustomersStore();
const sale = storeToRefs(salesStore).sale;
const saleStatus = storeToRefs(salesStore).saleStatus;
const salesStatus = storeToRefs(salesStore).salesStatus;
const pagination = storeToRefs(salesStore).pagination;
const products = storeToRefs(productsStore).products;
const productsStatus = storeToRefs(productsStore).productsStatus;
const fetchSalesOfCustomer = salesStore.fetchSalesOfCustomer;
const customer = storeToRefs(customersStore).customer;

const createPopup = ref(false);
const updatePopup = ref(false);
const printPopup = ref(false);
const openCreatePopup = () => {
  createPopup.value = true;
};
const closeCreatePopup = () => {
  createPopup.value = false;
  salesStore.setInitialSale();
};

const openUpdatePopup = (sale: Sale) => {
  salesStore.setSale(sale);
  updatePopup.value = true;
};
const closeUpdatePopup = () => {
  updatePopup.value = false;
  salesStore.setInitialSale();
};
const openPrintPopup = (sale: Sale) => {
  printPopup.value = true;
};
const closePrintPopup = () => {
  printPopup.value = false;
};
const addItem = (product: Product) => {
  salesStore.addProductToSale(product);
};
const removeItem = (id: number) => {
  salesStore.removeProductFromSale(id);
};
const createSale = async (data: Sale) => {
  await salesStore.createSale(data);
};
const updateSale = async (data: Sale) => {
  await salesStore.updateSale(data);
};

const props = defineProps({
  customerId: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  salesStore.sale.customer_id = props.customerId;
  await fetchSalesOfCustomer(1, props.customerId);
  await productsStore.fetchProducts();
});
</script>
