<template>
    <ProductForm :status="status" :onSubmit="handleUpdate" submitButtonText="تعديل" :product="product" />
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
    update: {
        type: Function,
        required: true,
    },
    product: {
        type: Object as () => Product,
        required: true,
    },
});

const handleUpdate = async (data: Product) => {
    await props.update(props.product.id, data);
}
</script>