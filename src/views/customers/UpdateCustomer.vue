<template>
  <CustomerForm :customer="customer" :governorates="governorates" :status="statusRef" :onSubmit="updateHandler"
    submitButtonText="تحديث العميل" />
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import CustomerForm from './CustomerForm.vue';
import type { Customer, Governorate, Status } from '@/Types';

const props = defineProps({
  customer: {
    type: Object as () => Customer,
    required: true,
  },
  governorates: {
    type: Array as () => Governorate[],
    required: true,
  },
  status: {
    type: Object as () => Status,
    required: true,
  },
  updateCustomer: {
    type: Function,
    required: true,
  },
});

const statusRef = ref(props.status);
const customer = ref({ ...props.customer });

watch(() => props.status, (newStatus) => {
  statusRef.value = newStatus;
});

const updateHandler = async (data: Customer) => {
  await props.updateCustomer(props.customer.id, data);
};
</script>


