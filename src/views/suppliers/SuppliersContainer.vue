<template>
    <div v-if="status.loading" class="flex justify-center items-center h-full">
        <Loading stroke-color="#8f8f8f" />
    </div>
    <div v-if="status.success && suppliers.length">
        <ListSuppliers :suppliers="suppliers" :openUpdateDialog="openUpdateDialog" :openDeleteDialog="openDeleteDialog"
            :openShowDialog="openShowDialog" :getGovernorateNameById="getGovernorateNameById" />
    </div>
    <div v-if="status.success && !suppliers.length" class="flex justify-center items-center h-full">
        <h1 class="text-2xl text-gray-500">لا يوجد موردين</h1>
    </div>
    <PaginationItems v-if="!status.error && suppliers.length" :totalPages="pagination.lastPage"
        :currentPage="pagination.currentPage" :goToPage="suppliersStore.fetchSuppliers" />
    <EmptyDialog v-if="updatePopup" title="تعديل المورد" :close-dialog="closeUpdateDialog">
        <updateSupplier v-if="updatePopup" :supplier="supplier" :governorates="governoratesStore.governorates" :status="suppliersStore.getSupplierStatus"
            :close-dialog="closeUpdateDialog" :updateSupplier="suppliersStore.updateSupplier" />
    </EmptyDialog>
    <EmptyDialog v-if="showPopup" title="" :close-dialog="closeShowDialog">
        <ShowSupplier v-if="showPopup" :name="supplier.name" :address="supplier.address" :phone="supplier.phone"
            :governorate="getGovernorateNameById(supplier.governorate_id)" :balance="formatCurrency(supplier.balance!)" />
    </EmptyDialog>

    <TrueOrFalseDialog v-if="deletePopup" :title="'حذف'"
        :message="'وجميع تعاملاته ؟ ' + supplier.name + 'هل انت متاكد انك تريد حذف المورد'" :trueText="'نعم, احذفه'"
        :falseText="'الغاء'" :selectOption="handleDelete" />
</template>


<script lang="ts" setup >
import { onMounted, ref } from 'vue'
import { useSuppliersStore, useGovernoratesStore } from '../../stores'
import { storeToRefs } from 'pinia';
import CardsContainer from '../../components/CardsContainer.vue';
import EmptyDialog from '../../components/EmptyDialog.vue';
import TrueOrFalseDialog from '../../components/TrueOrFalseDialog.vue';
import PaginationItems from '../../components/PaginationItems.vue';
import PersonalInformationCard from '../../components/PersonalInformationCard.vue';
import type { Supplier } from '../../Types';
import updateSupplier from './UpdateSupplier.vue';
import Loading from '../../components/icons/Loading.vue';
import ShowSupplier from './ShowSupplier.vue';
import ListSuppliers from './ListSuppliers.vue';
import { formatCurrency } from '../../services/helper/helperFunctions';

const suppliersStore = useSuppliersStore()
const governoratesStore = useGovernoratesStore();
const suppliers = storeToRefs(suppliersStore).suppliers;
const supplier = storeToRefs(suppliersStore).supplier;
const status = storeToRefs(suppliersStore).suppliersStatus;
const updatePopup = ref(false);
const deletePopup = ref(false);
const showPopup = ref(false);
const pagination = storeToRefs(suppliersStore).pagination;

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
    await suppliersStore.fetchSuppliers();
});
</script>