<template>
  <SupplierForm :supplier="supplier" :governorates="governorates" :status="status" :onSubmit="updateHandler"
    submitButtonText="تعديل مورد" />
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import SupplierForm from './SupplierForm.vue';
import type { Supplier, Governorate, Status } from '../../Types';

const props = defineProps({
  supplier: {
    type: Object as () => Supplier,
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
  updateSupplier: {
    type: Function,
    required: true,
  },
});

const statusRef = ref(props.status);
const supplier = ref({ ...props.supplier });

watch(() => props.status, (newStatus) => {
  statusRef.value = newStatus;
});

const updateHandler = async (data: Supplier) => {
  await props.updateSupplier(props.supplier.id, data);
};
</script>




