<template>
    <CardsContainer>
        <PersonalInformationCard v-for="customer in customers" :key="customer.id" :name="customer.name"
            :phone="customer.phone" :address="customer.address"
            :governorate="getGovernorateNameById(customer.governorate_id)" :note="customer.note ?? undefined"
            :update="() => { openUpdateDialog(customer) }" :delete="() => { openDeleteDialog(customer) }"
            :show="() => { openShowDialog(customer) }" />
    </CardsContainer>
</template>

<script lang="ts" setup>
import CardsContainer from '../../components/CardsContainer.vue';
import PersonalInformationCard from '../../components/PersonalInformationCard.vue';
import { defineProps } from 'vue';
import type { Customer } from '../../Types';

const props = defineProps({
    customers: {
        type: Array as () => Customer[],
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