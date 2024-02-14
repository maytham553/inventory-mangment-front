<template>
    <div class="flex justify-between items-center gap-2 bg-gray-200 p-3 rounded-lg ">
        <div class="flex items-center gap-3">
            <label for="from">تاريخ اليوم</label>
            <input v-model="selectedDay" type="date" id="from" class="border-2 rounded-lg py-1 px-3" :max="today" />
        </div>
        <button @click="filterByDate"
            class="bg-green-500 hover:bg-green-700  text-white font-bold py-2 flex-1 max-w-xs px-4 rounded-lg">
            بحث
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const today = new Date().toISOString().split('T')[0]
const selectedDay = ref()
const props = defineProps({
    filter: {
        type: Function,
        required: true
    },
})


const filterByDate = () => {
    props.filter(selectedDay.value)
}

</script>




