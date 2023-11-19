<template>
    <div class="p-4 max-w-sm w-[30%]  bg-gray-200  rounded-lg ">
        <div>
            <span>id : </span>
            <span>{{ purchase.id }}</span>
        </div>
        <div>
            <span>الأسم : </span>
            <span>{{ supplierName }}</span>
        </div>
        <div>
            <span>التاريخ : </span>
            <span>{{ISO8601DateToHumanDate(purchase.created_at)}}</span>
        </div>
        <div>
            <span>الحالة : </span>
            <span>{{ purchase.status }}</span>
        </div>

        <div class="flex justify-between items-center">
            <button @click="() => updateHandler(purchase)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                تعديل
            </button>
            <button @click="() => showHandler(purchase.id)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                عرض
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Purchase } from '../Types';
import { ISO8601DateToHumanDate } from '@/services/helper/helperFunctions';

const props = defineProps({
    purchase: {
        type: Object as () => Purchase,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    update: {
        type: Function,
        required: true
    },
    show: {
        type: Function,
        required: true
    }
})

const updateHandler = (purchase:Purchase) => {
    props.update(purchase);
}

const showHandler = (id: number) => {
    props.show(id);
}
</script>