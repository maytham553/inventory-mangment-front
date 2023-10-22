<template>
    <div class="h-full w-full flex  flex-col justify-between items-center">
        <button @click="openCreatePopup" type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            إضافة
        </button>
        <div v-if="purchasesStatus.loading || rawMaterialsStatus.loading" class="flex justify-center items-center h-full">
            <Loading stroke-color="#8f8f8f" />
        </div>

        <div v-if="purchasesStatus.error || rawMaterialsStatus.error" class="text-red-500 text-sm">
            {{ purchasesStatus.message || rawMaterialsStatus.message }}
        </div>
        <PurchasesList v-if="purchasesStatus.success && rawMaterialsStatus.success" :purchases="purchasesStore.purchases"
            :supplierName="supplierName" :update="openUpdatePopup" :show="() => { }" />

        <EmptyDialog v-if="createPopup" :title="String(supplierId)" :close-dialog="closeCreatePopup">
            <CreatePurchase v-if="createPopup" :purchase="purchasesStore.purchase" :purchaseStatus="purchaseStatus"
                :rawMaterials="rawMaterials" :rawMaterialsStatus="rawMaterialsStatus" :addItem="addItem"
                :removeItem="removeItem" :onSubmit="createPurchase" submitButtonText="حفظ" />
        </EmptyDialog>

        <EmptyDialog v-if="updatePopup" :title="String(supplierId)" :close-dialog="closeUpdatePopup">
            <UpdatePurchase v-if="updatePopup" :purchase="purchasesStore.purchase" :purchaseStatus="purchaseStatus"
                :rawMaterials="rawMaterials" :rawMaterialsStatus="rawMaterialsStatus" :addItem="addItem"
                :removeItem="removeItem" :onSubmit="updatePurchase" submitButtonText="تعديل" />
        </EmptyDialog>

        <PaginationItems v-if="purchasesStatus.success && purchasesStore.purchases.length && rawMaterialsStatus.success"
            :currentPage="pagination.currentPage" :totalPages="pagination.lastPage"
            :goToPage="(page: number) => { purchasesStore.fetchPurchasesBySupplier(page, props.supplierId) }" />
    </div>
</template>

<script lang="ts" setup>
import CreatePurchase from './CreatePurchase.vue';
import { usePurchasesStore, useRawMaterialsStore } from '../../stores';
import { onMounted, ref, defineProps, watch } from 'vue';
import type { Purchase, RawMaterial } from '../../Types';
import Loading from '../../components/icons/Loading.vue';
import EmptyDialog from '../../components/EmptyDialog.vue';
import { storeToRefs } from 'pinia';
import PurchasesList from './PurchasesList.vue';
import UpdatePurchase from './UpdatePurchase.vue';
import PaginationItems from '@/components/PaginationItems.vue';


const purchasesStore = usePurchasesStore()
const rawMaterialsStore = useRawMaterialsStore()
const purchase = storeToRefs(purchasesStore).purchase;
const purchaseStatus = storeToRefs(purchasesStore).purchaseStatus;
const purchasesStatus = storeToRefs(purchasesStore).purchasesStatus;
const pagination = storeToRefs(purchasesStore).pagination;

const rawMaterials = storeToRefs(rawMaterialsStore).rawMaterials;
const rawMaterialsStatus = storeToRefs(rawMaterialsStore).rawMaterialsStatus;

const createPopup = ref(false);
const updatePopup = ref(false);

const openCreatePopup = () => {
    createPopup.value = true;
}
const closeCreatePopup = () => {
    createPopup.value = false;
    purchasesStore.setInitialPurchase();
}

const openUpdatePopup = (purchase: Purchase) => {
    purchasesStore.setPurchase(purchase);
    updatePopup.value = true;
}
const closeUpdatePopup = () => {
    updatePopup.value = false;
    purchasesStore.setInitialPurchase();
}
const addItem = (rawMaterial: RawMaterial) => {
    purchasesStore.addRawMaterialToPurchase(rawMaterial);
}
const removeItem = (id: number) => {
    purchasesStore.removeRawMaterialFromPurchase(id);
}
const createPurchase = async (data: Purchase, print: boolean) => {
    await purchasesStore.createPurchase(data);
    print ? purchasesStore.printPurchase(purchase.value, props.supplierName) : null;
    closeCreatePopup();
}
const updatePurchase = async (data: Purchase, print: boolean) => {
    await purchasesStore.updatePurchase(data);
    print ? purchasesStore.printPurchase(purchase.value, props.supplierName) : null;
    closeUpdatePopup();
}

const props = defineProps({
    supplierId: {
        type: Number,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
})


onMounted(async () => {
    purchasesStore.purchase.supplier_id = props.supplierId;
    await purchasesStore.fetchPurchasesBySupplier(1, props.supplierId);
    await rawMaterialsStore.fetchRawMaterials();
})
</script>

