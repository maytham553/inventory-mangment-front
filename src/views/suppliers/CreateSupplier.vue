
import SupplierForm from './SupplierForm.vue';
<template>
    <div class="m-auto  lg:p-24 p-10 lg:h-screen relative z-10 ">

        <SupplierForm :supplier="suppliersStore.initialSupplier" :governorates="governoratesStore.governorates"
            :status="suppliersStore.supplierStatus" :onSubmit="createSupplier" submitButtonText="إضافة مورد" />
        <BgView />
    </div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { useSuppliersStore, useGovernoratesStore } from '../../stores';
import SupplierForm from './SupplierForm.vue';
import type { Supplier } from '../../Types';
import BgView from '@/components/icons/BgView.vue';

const suppliersStore = useSuppliersStore();
const governoratesStore = useGovernoratesStore();

onMounted(async () => {
    await governoratesStore.fetchGovernorates();
});
const createSupplier = async (data: Supplier) => {
    await suppliersStore.createSupplier(data);
};
</script>
  