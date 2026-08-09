<template>
  <form
    @submit.prevent="handleSubmit"
    class="mx-auto h-full w-full flex justify-center flex-col items-center"
  >
    <div class="bg-gray-100 p-5 lg:w-1/2 w-full max-w-[500px] rounded-2xl">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 m-1">الاسم</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
          class="form-input w-full p-1 rounded-lg"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 m-1">البريد الالكتروني</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          class="form-input w-full p-1 rounded-lg ltr text-left"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 m-1">
          كلمة المرور
          <span v-if="!passwordRequired" class="text-gray-500 text-xs">
            (اتركها فارغة للابقاء على كلمة المرور الحالية)
          </span>
        </label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          :required="passwordRequired"
          minlength="8"
          autocomplete="new-password"
          class="form-input w-full p-1 rounded-lg ltr text-left"
        />
      </div>
      <div class="mb-4">
        <label for="type" class="block text-gray-700 m-1">الصلاحية</label>
        <select
          id="type"
          v-model="formData.type"
          required
          class="form-select w-full p-1 rounded-lg"
        >
          <option v-for="option in typeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <span v-if="status.error" class="text-red-500 text-center h-5">
          <span>{{ status.message }}</span>
        </span>
      </div>
      <div class="mb-4">
        <button
          type="submit"
          class="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded w-full flex justify-center gap-3"
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
import type { Status, User } from "../../Types";
import { userTypeOptions } from "../../services/helper/helperFunctions";
import Loading from "../../components/icons/Loading.vue";

const props = defineProps({
  user: {
    type: Object as () => User,
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
  /** Create needs a password, update keeps the old one when left empty. */
  passwordRequired: {
    type: Boolean,
    default: false,
  },
});

const typeOptions = userTypeOptions;

const buildFormData = (): User =>
  props.user
    ? ({ ...props.user, password: "" } as User)
    : ({ type: "User" } as User);

const formData = ref(buildFormData());

const handleSubmit = async () => {
  await props.onSubmit(formData.value);
  formData.value = buildFormData();
};
</script>
