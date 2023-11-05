<template>
    <div class="flex w-full justify-center gap-5  items-center ">
        <input class=" w-3/6 bg-gray-200 rounded-lg py-2 px-4 focus:border-none " type="text" :placeholder=placeholder
            v-model="search" @keyup.enter="handleSearch" />
        <button @click="handleSearch" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/6">
            بحث
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";


const props = defineProps({
    handleSearch: {
        type: Function,
        required: true
    },
    pageNumber: {
        type: Number,
        required: false,
        default: 1
    },
    placeholder: {
        type: String,
        required: false,
        default: 'بحث'
    }
})

const search = ref('');

const handleSearch = (): void => {
    const pageNumber = props.pageNumber;
    props.handleSearch(pageNumber, search.value)
}
</script>