<template>
  <div class=" relative z-50 pt-20 lg:h-screen">
      <CustomerForm :customer="customersStore.initialCustomer" :governorates="governoratesStore.governorates"
      :status="customersStore.customerStatus" :onSubmit="createCustomer" submitButtonText="إضافة عميل" />
      <BgView />

   </div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { useCustomersStore, useGovernoratesStore } from '../../stores';
import CustomerForm from './CustomerForm.vue';
import type { Customer } from '@/Types';
import BgView from '@/components/icons/BgView.vue';

const customersStore = useCustomersStore();
const governoratesStore = useGovernoratesStore();
onMounted(async () => {
    await governoratesStore.fetchGovernorates();
});
const createCustomer = async (data: Customer) => {
    await customersStore.createCustomer(data);
};
</script>
  