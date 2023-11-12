<template>
    <div class="h-full w-full flex  flex-col justify-between items-center">

        <div class="flex flex-col  justify-center items-center w-full">
            <div class="flex justify-center items-center w-full">
                <div class="w-1/3">
                    <Search
                        :handleSearch="(page = 1, search: string) => { fetchPurchasesBySupplier(page, props.supplierId, search) }"
                        placeholder="التسلسل" />
                </div>
                <button @click="openCreatePopup" type="button"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    إضافة
                </button>
            </div>

            <div class="flex justify-center items-center w-full">
                <div v-if="purchasesStatus.loading || rawMaterialsStatus.loading"
                    class="flex justify-center items-center m-10">
                    <Loading stroke-color="#8f8f8f" />
                </div>

                <div v-if="purchasesStatus.error || rawMaterialsStatus.error"
                    class="text-red-500 text-sm flex justify-center items-center m-10">
                    {{ purchasesStatus.message || rawMaterialsStatus.message }}
                </div>
                <div v-if="purchasesStatus.success && !purchases.length" class="flex justify-center items-center m-10">
                    <h1 class="text-2xl text-gray-500"> لا يوجد فواتير شراء </h1>
                </div>
            </div>
        </div>

        <PurchasesList v-if="purchasesStatus.success && rawMaterialsStatus.success" :purchases="purchasesStore.purchases"
            :supplierName="supplierName" :update="openUpdatePopup" :show="() => { }" />

        <EmptyDialog v-if="createPopup" :title="String(supplierId)" :close-dialog="closeCreatePopup">
            <CreatePurchase v-if="createPopup" :purchase="purchasesStore.purchase" :purchaseStatus="purchaseStatus"
                :rawMaterials="rawMaterials" :rawMaterialsStatus="rawMaterialsStatus" :addItem="addItem"
                :removeItem="removeItem" :onSubmit="createPurchase" submitButtonText="حفظ"
                :reCalculatePurchaseAfterChange="reCalculatePurchaseAfterChange" :print="openPrintPopup"
                :closeDialog="closeUpdatePopup" :clearForm="purchasesStore.setInitialPurchase" />
        </EmptyDialog>

        <EmptyDialog v-if="updatePopup" :title="String(supplierId)" :close-dialog="closeUpdatePopup">
            <UpdatePurchase v-if="updatePopup" :purchase="purchasesStore.purchase" :purchaseStatus="purchaseStatus"
                :rawMaterials="rawMaterials" :rawMaterialsStatus="rawMaterialsStatus" :addItem="addItem"
                :removeItem="removeItem" :onSubmit="updatePurchase" submitButtonText="تعديل"
                :reCalculatePurchaseAfterChange="reCalculatePurchaseAfterChange" :print="openPrintPopup"
                :closeDialog="closeUpdatePopup" />
        </EmptyDialog>

        <EmptyDialog v-if="printPopup" :title="supplierName" :close-dialog="closePrintPopup">
            <PurchasePrint :purchase="purchase" :supplier="supplier" :closeDialog="closePrintPopup" />
        </EmptyDialog>

        <PaginationItems v-if="purchasesStatus.success && purchasesStore.purchases.length && rawMaterialsStatus.success"
            :currentPage="pagination.currentPage" :totalPages="pagination.lastPage"
            :goToPage="(page: number) => { fetchPurchasesBySupplier(page, props.supplierId) }" />
    </div>
</template>

<script lang="ts" setup>
import CreatePurchase from './CreatePurchase.vue';
import { usePurchasesStore, useRawMaterialsStore, useSuppliersStore } from '../../stores';
import { onMounted, ref, defineProps, watch } from 'vue';
import type { Purchase, RawMaterial } from '../../Types';
import Loading from '../../components/icons/Loading.vue';
import EmptyDialog from '../../components/EmptyDialog.vue';
import { storeToRefs } from 'pinia';
import PurchasesList from './PurchasesList.vue';
import UpdatePurchase from './UpdatePurchase.vue';
import PaginationItems from '@/components/PaginationItems.vue';
import Search from '@/components/Search.vue';
import PurchasePrint from './PurchasePrint.vue';


const purchasesStore = usePurchasesStore()
const rawMaterialsStore = useRawMaterialsStore()
const supplierStore = useSuppliersStore()
const purchase = storeToRefs(purchasesStore).purchase;
const purchaseStatus = storeToRefs(purchasesStore).purchaseStatus;
const purchasesStatus = storeToRefs(purchasesStore).purchasesStatus;
const pagination = storeToRefs(purchasesStore).pagination;
const purchases = storeToRefs(purchasesStore).purchases;
const reCalculatePurchaseAfterChange = purchasesStore.reCalculatePurchaseAfterChange;
const rawMaterials = storeToRefs(rawMaterialsStore).rawMaterials;
const rawMaterialsStatus = storeToRefs(rawMaterialsStore).rawMaterialsStatus;
const fetchPurchasesBySupplier = purchasesStore.fetchPurchasesBySupplier
const supplier = storeToRefs(supplierStore).supplier;
const createPopup = ref(false);
const updatePopup = ref(false);
const printPopup = ref(false);

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
const openPrintPopup = (purchase: Purchase) => {
    printPopup.value = true;
}
const closePrintPopup = () => {
    printPopup.value = false;
}
const addItem = (rawMaterial: RawMaterial) => {
    purchasesStore.addRawMaterialToPurchase(rawMaterial);
}
const removeItem = (id: number) => {
    purchasesStore.removeRawMaterialFromPurchase(id);
}
const createPurchase = async (data: Purchase) => {
    await purchasesStore.createPurchase(data);
}
const updatePurchase = async (data: Purchase) => {
    await purchasesStore.updatePurchase(data);
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
    await fetchPurchasesBySupplier(1, props.supplierId);
    await rawMaterialsStore.fetchRawMaterials();
})
</script>

