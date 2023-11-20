<template>
  <form @submit.prevent="handleSubmit" class="w-full h-full flex justify-center flex-col items-center">
    <div class="bg-gray-100 p-5 sm:w-[400px] rounded-2xl">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 m-1">الاسم</label>
        <input type="text" id="name" v-model="formData.name" required class="form-input w-full p-1 rounded-lg" />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 m-1">البريد الالكتروني</label>
        <input type="email" id="email" v-model="formData.email" class="form-input w-full p-1 rounded-lg" />
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-gray-700 m-1 "> رقم الهاتف </label>
        <input type="text" id="phone" v-model="formData.phone" required class="form-input w-full p-1 rounded-lg" />
      </div>
      <div class="mb-4">
        <label for="address" class="block text-gray-700 m-1">العنوان</label>
        <input type="text" id="address" v-model="formData.address" required class="form-input w-full p-1 rounded-lg" />
      </div>
      <div class="mb-4">
        <label for="governorate_id" class="block text-gray-700 m-1">المحافظة</label>
        <select id="governorate_id" v-model="formData.governorate_id" required class="form-select w-full p-1 rounded-lg">
          <option value="" disabled>اختر المحافظة</option>
          <option v-for="governorate in governorates" :key="governorate.id" :value="governorate.id">
            {{ governorate.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="note" class="block text-gray-700 m-1">ملاحظة</label>
        <textarea id="note" v-model="formData.note" class="form-textarea w-full p-1 rounded-lg"></textarea>
      </div>
      <div class="mb-4">
        <span v-if="status.error" class="text-red-500 text-center h-5 ">
          <span>{{ status.message }}</span>
        </span>
      </div>
      <div class="mb-4">
        <button type="submit"
          class="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-lg w-full flex justify-center gap-3"
          :class="{ 'bg-blue-300': status.loading }" :disabled="status.loading">
          {{ submitButtonText }}
          <Loading v-if="status.loading" class="-mr-1 ml-3" />
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import type { Governorate, Status } from '../../Types';
import Loading from '../../components/icons/Loading.vue';


const props = defineProps({
  supplier: {
    type: Object,
    required: true,
  },
  governorates: {
    type: Array as () => Governorate[],
    required: true,
  },
  status: {
    type: Object as () => Status,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
  submitButtonText: {
    type: String,
    required: true,
  },
});

const formData = ref({ ...props.supplier });
const statusRef = ref<Status>(props.status);


watch(
  () => props.status,
  (newStatus: Status) => {
    statusRef.value = newStatus;
  }
);

const handleSubmit = async () => {
  await props.onSubmit(formData.value);
  formData.value = { ...props.supplier };
};
</script>
