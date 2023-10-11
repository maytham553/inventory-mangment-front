<template>
    <CardsContainer>
        <ItemCard v-for="rawMaterial in  rawMaterials " :key="rawMaterial.id" :id="rawMaterial.id!" :name="rawMaterial.name"
            :quantity="rawMaterial.quantity!" :note="rawMaterial.note ?? undefined"
            :update="() => { openUpdateDialog(rawMaterial) }" :delete="() => { openDeleteDialog(rawMaterial) }"
            :code="rawMaterial.code ?? ''"  :cost="rawMaterial.cost ?? 0" />
    </CardsContainer>
</template>

<script lang="ts" setup>
import CardsContainer from '../../components/CardsContainer.vue';
import ItemCard from '../../components/ItemCard.vue';
import { defineProps } from 'vue';
import type { RawMaterial } from '../../Types';
const props = defineProps({
    rawMaterials: {
        type: Array as () => RawMaterial[],
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