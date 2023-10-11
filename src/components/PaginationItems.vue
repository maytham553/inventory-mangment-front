<template>
    <div class="flex items-center justify-center gap-3 relative ">
        <button class="disabled:opacity-30 p-2 rounded-full   " :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)">
            <h1 class="font-bold text-gray-500 " >&lt;</h1>
        </button>
        <button class=" bg-gray-200 disabled:opacity-70 p-2 rounded-full w-32 " :disabled="currentPage === 1"
            @click="goToPage(1)">
            الاولى
        </button>
        <button v-if="currentPage > 1"
            class="bg-gray-200  font-bold    text-gray-900 hover:bg-gray-600  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(currentPage - 1)">
            {{ currentPage - 1 }}
        </button>
        <button
            class="font-bold bg-gray-600 text-gray-100 hover:bg-yellow-dark  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(currentPage)">
            {{ currentPage }}
        </button>
        <button v-if="totalPages >= currentPage + 1"
            class="bg-gray-200  font-bold    text-gray-900 hover:bg-gray-600  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(currentPage + 1)">
            {{ currentPage + 1 }}
        </button>
        <button v-if="totalPages >= currentPage + 2"
            class="bg-gray-200  font-bold    text-gray-900 hover:bg-gray-600  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(currentPage + 2)">
            {{ currentPage + 2 }}
        </button>

        <span v-if="totalPages >= currentPage + 4">...</span>
        <button v-if="totalPages >= currentPage + 4"
            class="bg-gray-200  font-bold    text-gray-900 hover:bg-gray-600  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(totalPages)">
            {{ totalPages }}
        </button>

        <button class="disabled:opacity-70    bg-gray-200 p-2 rounded-full w-32 " :disabled="currentPage === totalPages"
            @click="goToPage(totalPages)">
            الاخيرة
        </button>
        <button class="disabled:opacity-30   p-2 rounded-full " :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)">
            <h1 class="font-bold text-gray-500 " >&gt;</h1>
        </button>
    </div>
</template>
  
<script lang="ts" setup >
import { defineProps } from 'vue'

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    goToPage: {
        type: Function,
        required: true
    }
})

const goToPage = (page: number) => {
    props.goToPage(page)
}
</script>