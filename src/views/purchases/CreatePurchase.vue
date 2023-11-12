<template>
    <div class="flex gap-5 h-full overflow-hidden ">
        <PurchaseForm class="w-3/4 h-full " :purchase="purchase" :status="purchaseStatus" :removeItem="removeItem"
            :onSubmit="onSubmit" submitButtonText="حفظ" :reCalculatePurchaseAfterChange="reCalculatePurchaseAfterChange"
            :print="print" :closeDialog="closeDialog" :clearForm="clearForm" />
        <PurchaseRawMaterialList class="w-1/4 h-full overflow-auto " :rawMaterials="rawMaterials"
            :status="rawMaterialsStatus" :addItem="addItem" :removeItem="removeItem" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import PurchaseForm from './PurchaseForm.vue';
import PurchaseRawMaterialList from './PurchaseRawMaterialList.vue';
import type { Purchase, RawMaterial, Status } from '../../Types';

const props = defineProps({
    purchase: {
        type: Object as () => Purchase,
        required: true
    },
    purchaseStatus: {
        type: Object as () => Status,
        required: true
    },
    rawMaterials: {
        type: Array as () => RawMaterial[],
        required: true
    },
    rawMaterialsStatus: {
        type: Object as () => Status,
        required: true
    },
    addItem: {
        type: Function,
        required: true
    },
    removeItem: {
        type: Function,
        required: true
    },
    onSubmit: {
        type: Function,
        required: true
    },
    submitButtonText: {
        type: String,
        required: true
    },
    reCalculatePurchaseAfterChange: {
        type: Function,
        required: true
    },
    print: {
        type: Function,
        required: true
    },
    closeDialog: {
        type: Function,
        required: false,
        default: () => { }
    },
    clearForm: {
        type: Function,
        required: false,
        default: () => { }
    }
})


</script>