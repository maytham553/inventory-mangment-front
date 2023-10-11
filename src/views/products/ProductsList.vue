<template>
    <CardsContainer>
        <ItemCard v-for="product in  products " :key="product.id" :id="product.id!" :name="product.name"
            :price="product.price" :quantity="product.quantity!" :note="product.note ?? undefined" :update="() => {openUpdateDialog(product)}" 
              :delete="()=>{openDeleteDialog(product)}"           :code =" product.code ?? ''" :barcode=" product.barcode ?? '' " :cost=" product.cost ?? 0 " />
    </CardsContainer>
</template>

<script lang="ts" setup>
import CardsContainer from '../../components/CardsContainer.vue';
import ItemCard from '../../components/ItemCard.vue';
import { defineProps } from 'vue';
import type { Product } from '../../Types';
const props = defineProps({
    products: {
        type: Array as () => Product[],
        required: true
    },
    openUpdateDialog: {
        type: Function,
        required: true
    },
    openDeleteDialog: {
        type: Function,
        required: true
    }
})


</script>