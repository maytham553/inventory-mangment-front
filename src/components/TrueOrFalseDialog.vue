<template>
    <div class="fixed inset-0 flex items-center justify-center z-50   ">
        <div class="bg-white pb-4 rounded-xl shadow-lg z-30">
            <h2 class="mb-4 w-full rounded-t-xl bg-gray-900 font-bold text-xl text-gray-100 p-4 ">{{ title }}</h2>
            <div class="pt-8 px-8 ">
                <p class="mb-8">{{ message }}</p>
                <div class="flex justify-center gap-5">
                    <button @click="selectOption(true)"
                        class=" flex flex-row  gap-1 px-8 py-2   text-white hover:bg-red-700 bg-red-400 rounded-lg ">
                        {{ trueText }}
                        <Loading v-if="status.loading"  stroke-color="#8f8f8f" />
                    </button>
                    <button @click="selectOption(false)"
                        class=" px-8 py-2 bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-lg ">
                        {{ falseText }}
                    </button>
                </div>
                <p class="text-red-500 text-center h-5 ">
                    <span>{{ status.message }}</span>
                </p>
            </div>
        </div>
        <div class="absolute inset-0 bg-black opacity-30 z-10 "></div>
    </div>
</template>
  
<script setup lang="ts" >
import type { Status } from '@/Types';
import { defineProps } from 'vue'
import Loading from './icons/Loading.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    trueText: {
        type: String,
        required: true
    },
    falseText: {
        type: String,
        required: true
    },
    selectOption: {
        type: Function,
        required: true
    },
    status: {
        type: Object as () => Status,
        default: false
    },
})
</script>
