<template>
  <div class="z-0 relative">
    <div class="container pb-16 pt-10">
      <div class="flex items-center mb-10 px-5 justify-between">
        <div></div>
        <h1 class="text-4xl text-center font-bold text-blue-700">المنتجات</h1>
        <button
          @click="openCreatePopup"
          class="text-green-500 flex items-center justify-center gap-3 hover:text-green-700 font-bold relative"
        >
          <span
            class="absolute text-green-500 inset-0 flex items-center px-5 py-1 justify-center opacity-0 hover:opacity-100 transition duration-200 delay-75 rounded-r-full ease-in-out transform hover:translate-x-12"
          >
            إضافة
          </span>

          <PlusIcon :size="50" />
        </button>
      </div>

      <div
        v-if="productsStatus.loading"
        class="flex justify-center items-center h-full"
      >
        <Loading stroke-color="#8f8f8f" />
      </div>
      <div
        v-if="productsStatus.error"
        class="flex justify-center items-center h-full"
      >
        <span class="text-red-500 text-center h-5">
          <span>{{ productsStatus.message }}</span>
        </span>
      </div>
      <div
        v-if="productsStatus.success && !products.length"
        class="flex justify-center items-center h-full"
      >
        <span class="text-gray-500 text-center h-5">
          <span>لا يوجد منتجات</span>
        </span>
      </div>
      <ProductsList
        v-if="productsStatus.success && products.length"
        :products="products"
        :openUpdateDialog="openUpdateDialog"
        :openDeleteDialog="openDeleteDialog"
      />
    </div>

    <BgView />
  </div>
  <EmptyDialog
    v-if="createPopup"
    title="إضافة"
    :onClose="closeCreatePopup"
    :closeDialog="closeCreatePopup"
  >
    <CreateProduct :create="createProduct" :status="productStatus" />
  </EmptyDialog>
  <EmptyDialog
    v-if="updatePopup"
    title="تعديل"
    :onClose="closeUpdatePopup"
    :closeDialog="closeUpdatePopup"
  >
    <UpdateProduct
      :update="updateProduct"
      :status="productStatus"
      :product="product"
    />
  </EmptyDialog>
  <TrueOrFalseDialog
    v-if="deletePopup"
    title="حذف"
    :onClose="closeDeletePopup"
    :closeDialog="closeDeletePopup"
    :message="'هل تريد حذف المنتج ' + product.name + '؟'"
    :trueText="'نعم'"
    :falseText="'لا'"
    :selectOption="handleDelete"
    :status="productStatus"
  >
  </TrueOrFalseDialog>
  <div class="flex items-center w-full bg-white justify-center">
    <PaginationItems
      v-if="!productsStatus.error && products.length"
      :currentPage="pagination.currentPage"
      :totalPages="pagination.lastPage"
      :goToPage="(page: number) => { productsStore.fetchProducts(page) }"
    />
  </div>
</template>

<script setup lang="ts">
import ProductsList from "./ProductsList.vue";
import CreateProduct from "./CreateProduct.vue";
import UpdateProduct from "./UpdateProduct.vue";
import { useProductsStore } from "../../stores";
import { onMounted, ref } from "vue";
import type { Product } from "../../Types";
import Loading from "../../components/icons/Loading.vue";
import EmptyDialog from "../../components/EmptyDialog.vue";
import { storeToRefs } from "pinia";
import PaginationItems from "../../components/PaginationItems.vue";
import TrueOrFalseDialog from "@/components/TrueOrFalseDialog.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import BgView from "@/components/icons/BgView.vue";

const productsStore = useProductsStore();
const createPopup = ref(false);
const updatePopup = ref(false);
const deletePopup = ref(false);
const productsStatus = storeToRefs(productsStore).productsStatus;
const product = storeToRefs(productsStore).product;
const pagination = storeToRefs(productsStore).pagination;
const productStatus = storeToRefs(productsStore).productStatus;
const products = storeToRefs(productsStore).products;

const openCreatePopup = () => {
  createPopup.value = true;
};
const closeCreatePopup = () => {
  createPopup.value = false;
  productsStore.setProduct({} as Product);
  productsStore.clearProductStatus();
};
const openUpdateDialog = (product: Product) => {
  updatePopup.value = true;
  productsStore.setProduct(product);
};
const closeUpdatePopup = () => {
  updatePopup.value = false;
  productsStore.setProduct({} as Product);
  productsStore.clearProductStatus();
};
const openDeleteDialog = (product: Product) => {
  deletePopup.value = true;
  productsStore.setProduct(product);
};
const closeDeletePopup = () => {
  deletePopup.value = false;
  productsStore.setProduct({} as Product);
  productsStore.clearProductStatus();
};
const createProduct = async (product: Product) => {
  await productsStore.createProduct(product);
  closeCreatePopup();
};
const updateProduct = async (id: number, product: Product) => {
  await productsStore.updateProduct(id, product);
  closeUpdatePopup();
};
const handleDelete = async (approve: boolean) => {
  if (approve && product.value.id) {
    await productsStore.deleteProduct(product.value.id);
    closeDeletePopup();
  }
};

onMounted(async () => {
  await productsStore.fetchProducts(1);
});
</script>
