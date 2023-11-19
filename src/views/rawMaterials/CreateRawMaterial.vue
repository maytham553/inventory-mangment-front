<template>
  <div class="relative z-10 mx-auto p-0">
    <RawMaterialForm
      :status="status"
      :onSubmit="createHandler"
      submitButtonText="انشاء"
    />
    <BgView />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Status, RawMaterial } from "../../Types";
import RawMaterialForm from "./RawMaterialForm.vue";
import BgView from "@/components/icons/BgView.vue";

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
