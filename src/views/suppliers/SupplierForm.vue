<template>
  <h1 class="text-blue-500 text-4xl  font-bold  text-center"> إضافة مورد جديد</h1>
  <p class="my-5  text-gray-500 text-center">
    اضف مورد جديد ادناه
  </p>
  <form @submit.prevent="handleSubmit"
    class="w-full bg-gray-100 p-5 pt-10 sm:w-[400px] rounded-2xl mx-auto h-full flex gap-5 justify-center flex-col items-center">


    <input type="text" id="name" v-model="formData.name" required placeholder="الاسم"
      class="form-input w-full p-2 rounded-lg" />


    <input type="email" id="email" v-model="formData.email" placeholder="البريد الالكتروني"
      class="form-input w-full p-2 rounded-lg" />


    <input type="text" id="phone" v-model="formData.phone" required placeholder="رقم الهاتف"
      class="form-input w-full p-2 rounded-lg" />


    <input type="text" id="address" v-model="formData.address" required placeholder="العنوان"
      class="form-input w-full p-2 rounded-lg" />


    <select id="governorate_id" v-model="formData.governorate_id" required class=" w-full p-2 cursor-pointer rounded-lg">
      <option value="" disabled selected class=" w-full p-2 rounded-lg">اختر المحافظة</option>
      <option v-for="governorate in governorates" :key="governorate.id" :value="governorate.id">
        {{ governorate.name }}
      </option>
    </select>



    <textarea id="note" v-model="formData.note" placeholder="ملاحظة"
      class="form-textarea w-full p-2 rounded-lg"></textarea>


    <span v-if="status.error" class="text-red-500 text-center h-5 ">
      <span>{{ status.message }}</span>
    </span>


    <button type="submit"
      class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg  flex justify-center gap-3"
      :class="{ 'bg-blue-300': status.loading }" :disabled="status.loading">
      {{ submitButtonText }}
      <Loading v-if="status.loading" class="-mr-1 ml-3" />
    </button>


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
