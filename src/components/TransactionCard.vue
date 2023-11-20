<template>
        <div class="pb-3 pr-3 pt-3  w-[286px] h-[190px] bg-gray-100 drop-shadow-lg 
    hover:drop-shadow-xl rounded-lg   flex flex-col justify-between items-start">
            <div>
                <span>نوع العملية</span>
                <span>{{ type }}</span>
            </div>
            <div>
                <span>المبلغ : </span>
                <span>{{ amount }}</span>
            </div>
            <div>
                <span>تاريخ الإنشاء : </span>
                <span>{{ created_at }}</span>
            </div>
            <div>
                <span>تاريخ التعديل : </span>
                <span>{{ updated_at }}</span>
            </div>
            <div v-if="note">
                <span>ملاحظات : </span>
                <span>{{ note }}</span>
            </div>
    
        </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        required: true
    },
})


</script>