<template>
    <CardsContainer>
        <PersonalInformationCard v-for="supplier in suppliers" :key="supplier.id" :id="supplier.id!" :name="supplier.name"
            :phone="supplier.phone" :address="supplier.address"
            :governorate="getGovernorateNameById(supplier.governorate_id)" :note="supplier.note ?? undefined"
            :update="() => { openUpdateDialog(supplier) }" :delete="() => { openDeleteDialog(supplier) }"
            :show="() => { openShowDialog(supplier) }" />
    </CardsContainer>
</template>

<script lang="ts" setup>
import CardsContainer from '../../components/CardsContainer.vue';
import PersonalInformationCard from '../../components/PersonalInformationCard.vue';
import { defineProps } from 'vue';
import type { Supplier } from '../../Types';

const props = defineProps({
    suppliers: {
        type: Array as () => Supplier[],
        required: true
    },
    getGovernorateNameById: {
        type: Function,
        required: true
    },
    openUpdateDialog: {
        type: Function,
        required: true
    },
    openDeleteDialog: {
        type: Function,
        required: true
    },
    openShowDialog: {
        type: Function,
        required: true
    }
})
</script>