<template>
 
    <RawMaterialForm
      :status="status"
      :onSubmit="createHandler"
      submitButtonText="انشاء"
    />
  
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Status, RawMaterial } from "../../Types";
import RawMaterialForm from "./RawMaterialForm.vue";
 
const props = defineProps({
  status: {
    type: Object as () => Status,
    required: true,
  },
  create: {
    type: Function,
    required: true,
  },
});

const createHandler = async (data: RawMaterial) => {
  await props.create(data);
};
</script>
