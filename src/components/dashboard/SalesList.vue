<template>
    <div>
        <div v-for="(sale, index ) in sales" :key="index">
            <div class="flex justify-between items-center">
                <p>{{ sale.user_name }}</p>
            </div>
            <div v-for="(product, index ) in sale.products" :key="index">
                <div class="flex justify-between items-center">
                    <p>{{ product.name }}</p>
                    <p>{{ product.quantity }}</p>
                    <p>{{ product.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DashboardSale } from "../../Types";

const props = defineProps({
    sales: {
        type: Array as () => DashboardSale[],
        required: true
    },
})

</script>