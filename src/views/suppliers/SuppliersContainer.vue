<template>
  <div class="container pt-10 pb-16 bg-gray-50">
    <div class="flex items-center mb-10 px-5 justify-between">
      <h1 class="text-4xl w-1/3 text-right font-bold  text-secondary">
        كل الموردين
      </h1>

      <div class="w-2/3 flex items-center justify-start">
        <Search
          :handleSearch="fetchSuppliers"
          placeholder="التسلسل , الاسم  , رقم الهاتف , محافظة"
        />
      </div>
    </div>
    <div
      v-if="status.loading"
      class="flex justify-center items-center  "
    >
      <Loading stroke-color="#8f8f8f" />
    </div>
  
    <div v-if="status.error" class="flex justify-center items-center  ">
      <h1 class="text-2xl text-gray-500">{{ status.message }}</h1>
    </div>
    <div v-if="status.success && suppliers.length">
      <ListSuppliers
        :suppliers="suppliers"
        :openUpdateDialog="openUpdateDialog"
        :openDeleteDialog="openDeleteDialog"
        :openShowDialog="openShowDialog"
        :getGovernorateNameById="getGovernorateNameById"
      />
    </div>
    <div
      v-if="status.success && !suppliers.length"
      class="flex justify-center items-center h-full"
    >
      <h1 class="text-2xl text-gray-500">لا يوجد موردين</h1>
    </div>
  </div>
  <div class="flex items-center w-full bg-white justify-center">

  <PaginationItems
    v-if="status.success && suppliers.length"
    :totalPages="pagination.lastPage"
    :currentPage="pagination.currentPage"
    :goToPage="suppliersStore.fetchSuppliers"
  />
</div>

  <EmptyDialog
    v-if="updatePopup"
    title="تعديل المورد"
    :close-dialog="closeUpdateDialog"
  >
    <updateSupplier
      v-if="updatePopup"
      :supplier="supplier"
      :governorates="governoratesStore.governorates"
      :status="suppliersStore.getSupplierStatus"
      :close-dialog="closeUpdateDialog"
      :updateSupplier="suppliersStore.updateSupplier"
    />
  </EmptyDialog>
  <EmptyDialog v-if="showPopup" title="" :close-dialog="closeShowDialog">
    <ShowSupplier
      v-if="showPopup"
      :id="supplier.id!"
      :name="supplier.name"
      :address="supplier.address"
      :phone="supplier.phone"
      :governorate="getGovernorateNameById(supplier.governorate_id)"
      :balance="supplier.balance!"
      :reCalculateBalance="suppliersStore.reCalculateBalance"
    />
  </EmptyDialog>

  <TrueOrFalseDialog
    v-if="deletePopup"
    :title="'حذف'"
    :message="
      'وجميع تعاملاته ؟ ' + supplier.name + 'هل انت متاكد انك تريد حذف المورد'
    "
    :trueText="'نعم, احذفه'"
    :falseText="'الغاء'"
    :selectOption="handleDelete"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useSuppliersStore, useGovernoratesStore } from "../../stores";
import { storeToRefs } from "pinia";
import EmptyDialog from "../../components/EmptyDialog.vue";
import TrueOrFalseDialog from "../../components/TrueOrFalseDialog.vue";
import PaginationItems from "../../components/PaginationItems.vue";
import type { Supplier } from "../../Types";
import updateSupplier from "./UpdateSupplier.vue";
import Loading from "../../components/icons/Loading.vue";
import ShowSupplier from "./ShowSupplier.vue";
import ListSuppliers from "./ListSuppliers.vue";
import Search from "@/components/Search.vue";

const suppliersStore = useSuppliersStore();
const governoratesStore = useGovernoratesStore();
const suppliers = storeToRefs(suppliersStore).suppliers;
const supplier = storeToRefs(suppliersStore).supplier;
const status = storeToRefs(suppliersStore).suppliersStatus;
const updatePopup = ref(false);
const deletePopup = ref(false);
const showPopup = ref(false);
const pagination = storeToRefs(suppliersStore).pagination;
const fetchSuppliers = suppliersStore.fetchSuppliers;

const openUpdateDialog = (supplier: Supplier) => {
  suppliersStore.setSupplier(supplier);
  updatePopup.value = true;
};
const openShowDialog = (supplier: Supplier) => {
  suppliersStore.setSupplier(supplier);
  showPopup.value = true;
};
const openDeleteDialog = (supplier: Supplier) => {
  suppliersStore.setSupplier(supplier);
  deletePopup.value = true;
};
const handleDelete = (approve: boolean) => {
  if (approve && supplier.value.id) {
    suppliersStore.deleteSupplier(supplier.value.id);
  }
  closeDeleteDialog();
};
const closeUpdateDialog = () => {
  updatePopup.value = false;
};
const closeDeleteDialog = () => {
  deletePopup.value = false;
};
const closeShowDialog = () => {
  showPopup.value = false;
};
const getGovernorateNameById = (id: number): string => {
  const governorate = governoratesStore.getGovernorateById(id);
  const governorateName = governorate ? governorate.name : "";
  return governorate ? governorate.name : "";
};
onMounted(async () => {
  await governoratesStore.fetchGovernorates();
  await fetchSuppliers();
});
</script>
