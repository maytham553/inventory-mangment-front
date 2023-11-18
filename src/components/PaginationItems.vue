<template>
    <div class="flex items-center justify-center gap-3 relative ">
        <button class="disabled:opacity-30 p-2 rounded-full   " :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)">
            <h1 class="font-bold text-[#172350] " >&lt;</h1>
        </button>
        <button class="text-white bg-[#29ADB2] hover:bg-[#0E1932] disabled:opacity-70 p-2 rounded-full w-20 " :disabled="currentPage === 1"
            @click="goToPage(1)">
            الاولى
        </button>
        <button v-if="currentPage > 1"
            class="bg-[#29ADB2]  font-bold    text-white hover:bg-[#0E1932]  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(currentPage - 1)">
            {{ currentPage - 1 }}
        </button>
        <button
            class="font-bold bg-white text-[#0E1932]  border border-[#29ADB2] rounded-full h-8 w-8 flex items-center justify-center "
            disabled
            @click="goToPage(currentPage)">
            {{ currentPage }}
        </button>
        <button v-if="totalPages >= currentPage + 1"
            class="text-white bg-[#29ADB2]  font-bold hover:[#0E1932]  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(currentPage + 1)">
            {{ currentPage + 1 }}
        </button>
        <button v-if="totalPages >= currentPage + 2"
            class="text-white bg-[#29ADB2]  font-bold hover:bg-[#0E1932]  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(currentPage + 2)">
            {{ currentPage + 2 }}
        </button>

        <span v-if="totalPages >= currentPage + 4">...</span>
        <button v-if="totalPages >= currentPage + 4"
            class="text-white bg-[#29ADB2]  font-bold     hover:bg-[#0E1932]  rounded-full h-8 w-8 flex items-center justify-center"
            @click="goToPage(totalPages)">
            {{ totalPages }}
        </button>

        <button class="disabled:opacity-70  text-white  bg-[#29ADB2] hover:bg-[#0E1932] p-2 rounded-full w-20 " :disabled="currentPage === totalPages"
            @click="goToPage(totalPages)">
            الاخيرة
        </button>
        <button class="disabled:opacity-30   p-2 rounded-full " :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)">
            <h1 class="font-bold text-[#172350] " >&gt;</h1>
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