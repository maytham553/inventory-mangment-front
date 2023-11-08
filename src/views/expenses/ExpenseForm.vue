<template>
    <form @submit.prevent="handleSubmit" class="w-full h-full flex justify-center flex-col items-center">
        <div class="bg-gray-100 p-5 rounded-2xl">
            <div class="mb-4">
                <label for="title" class="block text-gray-700 m-1"> العنوان </label>
                <input id="title" type="text" required  v-model="formData.title" class="form-textarea w-full p-1 rounded-lg"/>
            </div>
            <div class="mb-4">
                <label for="amount" class="block text-gray-700 m-1">المبلغ</label>
                <input type="number" id="amount" v-model="formData.amount" required
                    class="form-input w-full p-1 rounded-lg" />
            </div>
            <div class="mb-4">
                <label for="description" class="block text-gray-700 m-1">الوصف</label>
                <textarea id="description" v-model="formData.description" class="form-textarea w-full p-1 rounded-lg"></textarea>
            </div>
            <div class="mb-4">
                <span v-if="status.error" class="text-red-500 text-center h-5">
                    <span>{{ status.message }}</span>
                </span>
            </div>
            <div class="mb-4">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full flex justify-center gap-3"
                    :class="{ 'bg-blue-300': status.loading }" :disabled="status.loading">
                    {{ submitButtonText }}
                    <Loading v-if="status.loading" class="-mr-1 ml-3" />
                </button>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { type Status, type Expense } from '../../Types';
import Loading from '../../components/icons/Loading.vue';


const props = defineProps({
    expense: {
        type: Object as () => Expense,
        required: false
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

const formData = props.expense ? ref({ ...props.expense }) : ref({
    title: "",
    amount: null,
    description: "",
});

const handleSubmit = async () => {
    await props.onSubmit(formData.value);
    formData.value = { ...props.expense } as Expense;
};
</script>