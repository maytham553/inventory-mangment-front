<template>
    <CardsContainer >
        <PurchaseCard v-for="purchase in purchases" :key="purchase.id" :purchase="purchase"
            :supplierName="supplierName" :update="update" :show="show" />
    </CardsContainer>
</template>

<script lang="ts" setup>
import type { Purchase, Status } from '@/Types';
import CardsContainer from '@/components/CardsContainer.vue';
import PurchaseCard from '@/components/PurchaseCard.vue';
import Loading from '@/components/icons/Loading.vue';
import { defineProps } from 'vue'

const props = defineProps({
    purchases: {
        type: Array as () => Purchase[],
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    update: {
        type: Function,
        required: true
    },
    show: {
        type: Function,
        required: true
    }

})

</script>