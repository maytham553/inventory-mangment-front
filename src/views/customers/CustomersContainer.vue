
<template>
    <div v-if="status.loading" class="flex justify-center items-center h-full">
        <Loading stroke-color="#8f8f8f" />
    </div>
    <div v-if="status.error" class="flex justify-center items-center h-full">
        <h1 class="text-2xl text-gray-500">{{ status.message }}</h1>
    </div>
    <div v-if="status.success && customers.length">
        <ListCustomers :customers="customers" :openUpdateDialog="openUpdateDialog" :openDeleteDialog="openDeleteDialog"
            :openShowDialog="openShowDialog" :getGovernorateNameById="getGovernorateNameById" />
    </div>
    <div v-if="status.success && !customers.length" class="flex justify-center items-center h-full">
        <h1 class="text-2xl text-gray-500">لا يوجد عملاء</h1>
    </div>
    <PaginationItems v-if="!status.error && customers.length" :totalPages="pagination.lastPage"
        :currentPage="pagination.currentPage" :goToPage="customersStore.fetchCustomers" />
    <EmptyDialog v-if="updatePopup" title="تعديل العميل" :close-dialog="closeUpdateDialog">
        <updateCustomer v-if="updatePopup" :customer="customer" :governorates="governoratesStore.governorates"
            :status="customersStore.getCustomerStatus" :close-dialog="closeUpdateDialog"
            :updateCustomer="customersStore.updateCustomer" />
    </EmptyDialog>
    <EmptyDialog v-if="showPopup" title="" :close-dialog="closeShowDialog">
        <ShowCustomer v-if="showPopup" :id="customer.id!" :name="customer.name" :address="customer.address"
            :phone="customer.phone" :governorate="getGovernorateNameById(customer.governorate_id)"
            :balance="formatCurrency(customer.balance!)" />
    </EmptyDialog>

    <TrueOrFalseDialog v-if="deletePopup" :title="'حذف'"
        :message="'وجميع تعاملاته ؟ ' + customer.name + 'هل انت متاكد انك تريد حذف العميل'" :trueText="'نعم, احذفه'"
        :falseText="'الغاء'" :selectOption="handleDelete" />
</template>


<script lang="ts" setup >
import { onMounted, ref } from 'vue'
import { useCustomersStore, useGovernoratesStore } from '../../stores'
import { storeToRefs } from 'pinia';
import CardsContainer from '../../components/CardsContainer.vue';
import EmptyDialog from '../../components/EmptyDialog.vue';
import TrueOrFalseDialog from '../../components/TrueOrFalseDialog.vue';
import PaginationItems from '../../components/PaginationItems.vue';
import PersonalInformationCard from '../../components/PersonalInformationCard.vue';
import type { Customer } from '../../Types';
import updateCustomer from './UpdateCustomer.vue';
import Loading from '../../components/icons/Loading.vue';
import ShowCustomer from './ShowCustomer.vue';
import ListCustomers from './ListCustomers.vue';

const customersStore = useCustomersStore()
const governoratesStore = useGovernoratesStore();
const customers = storeToRefs(customersStore).customers;
const customer = storeToRefs(customersStore).customer;
const status = storeToRefs(customersStore).customersStatus;
const updatePopup = ref(false);
const deletePopup = ref(false);
const showPopup = ref(false);
const pagination = storeToRefs(customersStore).pagination;
import { formatCurrency } from '../../services/helper/helperFunctions';

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
}
const closeDeleteDialog = () => {
    deletePopup.value = false;
}
const closeShowDialog = () => {
    showPopup.value = false;
}
const getGovernorateNameById = (id: number): string => {
    const governorate = governoratesStore.getGovernorateById(id);
    const governorateName = governorate ? governorate.name : '';
    return governorate ? governorate.name : '';
}
onMounted(async () => {
    await governoratesStore.fetchGovernorates();
    await customersStore.fetchCustomers();
});
</script>