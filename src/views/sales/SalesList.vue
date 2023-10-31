<template>
    <CardsContainer >
        <SaleCard v-for="sale in sales" :key="sale.id" :sale="sale"
            :customerName="customerName" :update="update" :show="show" />
    </CardsContainer>
</template>

<script lang="ts" setup>
import type { Sale, Status } from '../../Types';
import CardsContainer from '../../components/CardsContainer.vue';
import SaleCard from '../../components/SaleCard.vue';
import Loading from '../../components/icons/Loading.vue';
import { defineProps } from 'vue'

const props = defineProps({
    sales: {
        type: Array as () => Sale[],
        required: true
    },
    customerName: {
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