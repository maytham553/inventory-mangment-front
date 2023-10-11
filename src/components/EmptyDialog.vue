<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class=" max-w-[75%]  bg-white pb-4 rounded-xl shadow-lg z-30">
            <h2 class="mb-4 w-full rounded-t-xl bg-gray-900 font-bold text-xl text-gray-100 p-4">{{ title }}</h2>
            <div class="pt-8 px-8">
                <slot></slot>
            </div>
        </div>
        <div class="absolute inset-0 bg-black opacity-30 z-10 " @click="closeDialog"></div>
    </div>
</template>
  
<script setup lang="ts" >
import { defineProps } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    closeDialog: {
        type: Function,
        required: true
    },
})

const closeDialog = () => {
    props.closeDialog()
}
</script>