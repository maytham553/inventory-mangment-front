<template>
    <div class="p-4 max-w-sm max-h-sm  bg-gray-200  rounded-lg ">
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