<template>
    <RawMaterialForm :status="status" :onSubmit="handleUpdate" submitButtonText="تعديل" :rawMaterial="rawMaterial" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Status, RawMaterial } from '../../Types';
import RawMaterialForm from './RawMaterialForm.vue';

const props = defineProps({
    status: {
        type: Object as () => Status,
        required: true,
    },
    update: {
        type: Function,
        required: true,
    },
    rawMaterial: {
        type: Object as () => RawMaterial,
        required: true,
    },
});

const handleUpdate = async (data: RawMaterial) => {
    await props.update(props.rawMaterial.id, data);
}
</script>