<template>
  <div class="container pt-10 pb-16 w-full">
    <div class="flex items-center mb-10 px-5 justify-between">
      <h1 class="text-4xl w-1/3 text-right font-bold  text-secondary">
        كل العملاء
      </h1>

      <div class="w-2/3 flex items-center justify-start">
        <Search
          :handleSearch="customersStore.fetchCustomers"
          placeholder="التسلسل , الاسم  , رقم الهاتف , محافظة"
        />
      </div>
    </div>

    <div v-if="status.loading" class="flex justify-center items-center m-5">
      <Loading stroke-color="#8f8f8f" />
    </div>
    <div v-if="status.error" class="flex justify-center items-center m-5">
      <h1 class="text-2xl text-gray-500">{{ status.message }}</h1>
    </div>
    <div v-if="status.success && customers.length">
      <ListCustomers
        :customers="customers"
        :openUpdateDialog="openUpdateDialog"
        :openDeleteDialog="openDeleteDialog"
        :openShowDialog="openShowDialog"
        :getGovernorateNameById="getGovernorateNameById"
      />
    </div>
    <div
      v-if="status.success && !customers.length"
      class="flex justify-center items-center h-full"
    >
      <h1 class="text-2xl text-gray-500">لا يوجد عملاء</h1>
    </div>
  </div>
  <div class="flex items-center w-full bg-white justify-center">
    <PaginationItems
      v-if="status.success && customers.length"
      :totalPages="pagination.lastPage"
      :currentPage="pagination.currentPage"
      :goToPage="customersStore.fetchCustomers"
    />
  </div>

  <EmptyDialog
    v-if="updatePopup"
    title="تعديل العميل"
    :close-dialog="closeUpdateDialog"
  >
    <updateCustomer
      v-if="updatePopup"
      :customer="customer"
      :governorates="governoratesStore.governorates"
      :status="customersStore.getCustomerStatus"
      :close-dialog="closeUpdateDialog"
      :updateCustomer="customersStore.updateCustomer"
    />
  </EmptyDialog>
  <EmptyDialog
    v-if="showPopup"
    title="معلومات العميل"
    :close-dialog="closeShowDialog"
  >
    <ShowCustomer
      v-if="showPopup"
      :id="customer.id!"
      :name="customer.name"
      :address="customer.address"
      :phone="customer.phone"
      :governorate="getGovernorateNameById(customer.governorate_id)"
      :balance="customer.balance!"
      :reCalculateBalance="customersStore.reCalculateBalance"
    />
  </EmptyDialog>

  <TrueOrFalseDialog
    v-if="deletePopup"
    :title="'حذف'"
    class="rtl"
    :message="
      'وجميع تعاملاته ؟ ' + customer.name + 'هل انت متاكد انك تريد حذف العميل'
    "
    :trueText="'نعم, احذفه'"
    :falseText="'الغاء'"
    :selectOption="handleDelete"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCustomersStore, useGovernoratesStore } from "../../stores";
import { storeToRefs } from "pinia";
import EmptyDialog from "../../components/EmptyDialog.vue";
import TrueOrFalseDialog from "../../components/TrueOrFalseDialog.vue";
import PaginationItems from "../../components/PaginationItems.vue";
import type { Customer } from "../../Types";
import updateCustomer from "./UpdateCustomer.vue";
import Loading from "../../components/icons/Loading.vue";
import ShowCustomer from "./ShowCustomer.vue";
import ListCustomers from "./ListCustomers.vue";
import Search from "@/components/Search.vue";

const customersStore = useCustomersStore();
const governoratesStore = useGovernoratesStore();
const customers = storeToRefs(customersStore).customers;
const customer = storeToRefs(customersStore).customer;
const status = storeToRefs(customersStore).customersStatus;
const updatePopup = ref(false);
const deletePopup = ref(false);
const showPopup = ref(false);
const pagination = storeToRefs(customersStore).pagination;
// fetch customers
const fetchCustomers = customersStore.fetchCustomers;

const openUpdateDialog = (customer: Customer) => {
  customersStore.setCustomer(customer);
  updatePopup.value = true;
};
const openShowDialog = (customer: Customer) => {
  customersStore.setCustomer(customer);
  showPopup.value = true;
};
const openDeleteDialog = (customer: Customer) => {
  customersStore.setCustomer(customer);
  deletePopup.value = true;
};
const handleDelete = (approve: boolean) => {
  if (approve && customer.value.id) {
    customersStore.deleteCustomer(customer.value.id);
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
  await fetchCustomers();
});
</script>
