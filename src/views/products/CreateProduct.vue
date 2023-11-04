<template>
    <ProductForm :status="status" :onSubmit="createHandler" submitButtonText="انشاء" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type Status, type Product } from '../../Types';
import ProductForm from './ProductForm.vue';

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

const createHandler = async (data: Product) => {
    await props.create(data);
};


</script>
