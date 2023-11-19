<template>
  <div class="z-0 relative">
    <div class="container pt-10 pb-16">
      <div class="flex items-center mb-10 px-5 justify-between">
        <div></div>
        <h1 class="text-4xl text-center font-bold text-blue-700">
          المواد الخام
        </h1>
        <button
          @click="openCreatePopup"
          class="text-green-500 flex items-center justify-center gap-3 hover:text-green-700 font-bold relative"
        >
          <span
            class="absolute text-green-500 inset-0 flex items-center px-5 py-1 justify-center opacity-0 hover:opacity-100 transition duration-200 delay-75 rounded-r-full ease-in-out transform hover:translate-x-12"
          >
            إضافة
          </span>

          <PlusIcon :size="50" />
        </button>
      </div>
      <div
        v-if="rawMaterialsStatus.loading"
        class="flex justify-center items-center h-full"
      >
        <Loading stroke-color="#8f8f8f" />
      </div>
      <div
        v-if="rawMaterialsStatus.error"
        class="flex justify-center items-center h-full"
      >
        <span class="text-red-500 text-center h-5">
          <span>{{ rawMaterialsStatus.message }}</span>
        </span>
      </div>
      <div
        v-if="rawMaterialsStatus.success && !rawMaterials.length"
        class="flex justify-center items-center h-full"
      >
        <span class="text-gray-500 text-center h-5">
          <span>لا يوجد مواد خام</span>
        </span>
      </div>
      <RawMaterialsList
        v-if="rawMaterialsStatus.success && rawMaterials.length"
        :rawMaterials="rawMaterials"
        :openUpdateDialog="openUpdateDialog"
        :openDeleteDialog="openDeleteDialog"
      />

    
      <BgView />
    </div>
    <BgView />
  </div>
  <EmptyDialog
        v-if="createPopup"
        title="إضافة"
        :onClose="closeCreatePopup"
        :closeDialog="closeCreatePopup"
      >
        <CreateRawMaterial
          :create="createRawMaterial"
          :status="rawMaterialStatus"
        />
      </EmptyDialog>
      <EmptyDialog
        v-if="updatePopup"
        title="تعديل"
        :onClose="closeUpdatePopup"
        :closeDialog="closeUpdatePopup"
      >
        <UpdateRawMaterial
          :update="updateRawMaterial"
          :status="rawMaterialStatus"
          :rawMaterial="rawMaterial"
        />
      </EmptyDialog>
      <TrueOrFalseDialog
        v-if="deletePopup"
        title="حذف"
        :onClose="closeDeletePopup"
        :closeDialog="closeDeletePopup"
        :message="'هل تريد حذف المادة الخام ' + rawMaterial.name + '؟'"
        :trueText="'نعم'"
        :falseText="'لا'"
        :selectOption="handleDelete"
        :status="rawMaterialStatus"
      >
      </TrueOrFalseDialog>
      <div class="flex items-center w-full bg-white justify-center">

    <PaginationItems
      v-if="!rawMaterialsStatus.error && rawMaterials.length"
      :currentPage="pagination.currentPage"
      :totalPages="pagination.lastPage"
      :goToPage="(page: number) => { rawMaterialsStore.fetchRawMaterials(page) }"
    />
  </div>

</template>

<script setup lang="ts">
import RawMaterialsList from "./RawMaterialsList.vue";
import CreateRawMaterial from "./CreateRawMaterial.vue";
import UpdateRawMaterial from "./UpdateRawMaterial.vue";
import { useRawMaterialsStore } from "../../stores";
import { onMounted, ref } from "vue";
import type { RawMaterial } from "../../Types";
import Loading from "../../components/icons/Loading.vue";
import PlusIcon from "../../components/icons/PlusIcon.vue";
import EmptyDialog from "../../components/EmptyDialog.vue";
import { storeToRefs } from "pinia";
import PaginationItems from "../../components/PaginationItems.vue";
import TrueOrFalseDialog from "../../components/TrueOrFalseDialog.vue";
import BgView from "@/components/icons/BgView.vue";
const rawMaterialsStore = useRawMaterialsStore();
const createPopup = ref(false);
const updatePopup = ref(false);
const deletePopup = ref(false);
const rawMaterialsStatus = storeToRefs(rawMaterialsStore).rawMaterialsStatus;
const rawMaterial = storeToRefs(rawMaterialsStore).rawMaterial;
const pagination = storeToRefs(rawMaterialsStore).pagination;
const rawMaterialStatus = storeToRefs(rawMaterialsStore).rawMaterialStatus;
const rawMaterials = storeToRefs(rawMaterialsStore).rawMaterials;

const openCreatePopup = () => {
  createPopup.value = true;
};
const closeCreatePopup = () => {
  createPopup.value = false;
  rawMaterialsStore.setRawMaterial({} as RawMaterial);
  rawMaterialsStore.clearRawMaterialStatus();
};
const openUpdateDialog = (rawMaterial: RawMaterial) => {
  updatePopup.value = true;
  console.log(rawMaterial);
  rawMaterialsStore.setRawMaterial(rawMaterial);
};
const closeUpdatePopup = () => {
  updatePopup.value = false;
  rawMaterialsStore.setRawMaterial({} as RawMaterial);
  rawMaterialsStore.clearRawMaterialStatus();
};
const openDeleteDialog = (rawMaterial: RawMaterial) => {
  deletePopup.value = true;
  rawMaterialsStore.setRawMaterial(rawMaterial);
};
const closeDeletePopup = () => {
  deletePopup.value = false;
  rawMaterialsStore.setRawMaterial({} as RawMaterial);
  rawMaterialsStore.clearRawMaterialStatus();
};

const createRawMaterial = async (data: RawMaterial) => {
  await rawMaterialsStore.createRawMaterial(data);
  closeCreatePopup();
};
const updateRawMaterial = async (id: number, data: RawMaterial) => {
  await rawMaterialsStore.updateRawMaterial(id, data);
  closeUpdatePopup();
};
const handleDelete = async (approve: boolean) => {
  if (approve && rawMaterial.value.id) {
    await rawMaterialsStore.deleteRawMaterial(rawMaterial.value.id);
    closeDeletePopup();
  }
};
onMounted(async () => {
  await rawMaterialsStore.fetchRawMaterials();
  console.log(rawMaterialsStore.rawMaterials);
});
</script>
