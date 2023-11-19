<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full mx-auto h-full flex justify-center flex-col items-center"
  >
    <div class="bg-gray-100 p-5 lg:w-1/2 max-w-[500px] rounded-2xl">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 m-1">الاسم</label>
        <input
          type="string"
          id="name"
          v-model="formData.name"
          required
          class="form-input w-full p-1 rounded-lg"
        />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-gray-700 m-1">السعر</label>
        <input
          type="number"
          id="price"
          v-model="formData.price"
          required
          class="form-input w-full p-1 rounded-lg"
        />
      </div>
      <div class="mb-4">
        <label for="cost" class="block text-gray-700 m-1">التكلفة</label>
        <input
          type="number"
          id="cost"
          v-model="formData.cost"
          required
          class="form-input w-full p-1 rounded-lg"
        />
      </div>
      <div class="mb-4">
        <label for="quantity" class="block text-gray-700 m-1">الكمية</label>
        <input
          type="number"
          id="quantity"
          v-model="formData.quantity"
          required
          class="form-input w-full p-1 rounded-lg"
        />
      </div>
      <div class="mb-4">
        <label for="barcode" class="block text-gray-700 m-1">الباركود</label>
        <input
          type="string"
          id="barcode"
          v-model="formData.barcode"
          required
          class="form-input w-full p-1 rounded-lg"
        />
      </div>
      <div class="mb-4">
        <label for="code" class="block text-gray-700 m-1">الكود</label>
        <input
          type="string"
          id="code"
          v-model="formData.code"
          required
          class="form-input w-full p-1 rounded-lg"
        />
      </div>

      <div class="mb-4">
        <label for="note" class="block text-gray-700 m-1">ملاحظة</label>
        <textarea
          id="note"
          v-model="formData.note"
          class="form-textarea w-full p-1 rounded-lg"
        ></textarea>
      </div>

      <div class="mb-4">
        <span v-if="status.error" class="text-red-500 text-center h-5">
          <span>{{ status.message }}</span>
        </span>
      </div>
      <div class="mb-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full flex justify-center gap-3"
          :class="{ 'bg-blue-300': status.loading }"
          :disabled="status.loading"
        >
          {{ submitButtonText }}
          <Loading v-if="status.loading" class="-mr-1 ml-3" />
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Status, Product } from "../../Types";
import Loading from "../../components/icons/Loading.vue";

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: false,
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

const formData = props.product ? ref({ ...props.product }) : ref({} as Product);

const handleSubmit = async () => {
  await props.onSubmit(formData.value);
  formData.value = { ...props.product } as Product;
};
</script>
