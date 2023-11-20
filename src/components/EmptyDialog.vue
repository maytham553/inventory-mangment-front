<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class=" h-full w-full  bg-white   z-30 flex flex-col overflow-hidden  ">
            <div v-if="!hiddenBar" class="flex justify-between items-center bg-blue-700 font-bold  text-gray-100 p-4  ">
                <div></div>
                <h2 class="text-xl font-bold">{{ title }}</h2>
                <button @click="closeDialog" type="button"
                    class=" text-white  flex items-center justify-center  ">
                    <svg
      viewBox="0 0 840 1000"
      fill="currentColor"
      height="20px"
      width="20px"
       class="text-red-500 hover:text-red-700 w-10 h-10"
    >
      <path d="M420 80c116 0 215 41 297 123s123 181 123 297-41 215-123 297-181 123-297 123-215-41-297-123S0 616 0 500s41-215 123-297S304 80 420 80m86 420l154-154-86-86-154 152-152-152-88 86 154 154-154 152 88 86 152-152 154 152 86-86-154-152" />
    </svg>
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