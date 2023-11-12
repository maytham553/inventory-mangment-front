<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class=" h-full w-full  bg-white pb-4  z-30 flex flex-col overflow-hidden  ">
            <div v-if="!hiddenBar" class="flex justify-between items-center bg-gray-900 font-bold  text-gray-100 p-2">
                <h2 class="text-xl font-bold">{{ title }}</h2>
                <button @click="closeDialog" type="button"
                    class="bg-red-500 hover:bg-red-700 text-white  w-6 h-6 rounded">
                    x
                </button>
            </div>
            <div class="pt-8 px-8 h-full w-full  overflow-auto  ">
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
    hiddenBar: {
        type: Boolean,
        default: false
    }
})

const closeDialog = () => {
    props.closeDialog()
}
</script>