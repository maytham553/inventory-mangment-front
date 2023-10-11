
import SupplierForm from './SupplierForm.vue';
<template>
    <SupplierForm :supplier="suppliersStore.initialSupplier" :governorates="governoratesStore.governorates"
        :status="suppliersStore.supplierStatus" :onSubmit="createSupplier" submitButtonText="إضافة مورد" />
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { useSuppliersStore, useGovernoratesStore } from '../../stores';
import SupplierForm from './SupplierForm.vue';
import type { Supplier } from '../../Types';

const suppliersStore = useSuppliersStore();
const governoratesStore = useGovernoratesStore();

onMounted(async () => {
    await governoratesStore.fetchGovernorates();
});
const createSupplier = async (data: Supplier) => {
    await suppliersStore.createSupplier(data);
};
</script>
  