<template>
    <div class="pb-3 border   pr-6 pt-3  w-[286px] h-[190px] bg-gray-100 drop-shadow-lg 
    hover:drop-shadow-xl rounded-lg   flex flex-col justify-between items-start">
        <div>
            <span>id : </span>
            <span>{{ sale.id }}</span>
        </div>
        <div>
            <span>الأسم : </span>
            <span>{{ customerName }}</span>
        </div>
        <div>
            <span>التاريخ : </span>
            <span>{{ISO8601DateToHumanDate(sale.created_at)}}</span>
        </div>
        <div>
            <span>الحالة : </span>
            <span>{{ sale.status }}</span>
        </div>

        <div class="flex justify-between gap-4 items-center">
            <button @click="() => updateHandler(sale)"
                class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold p-2 rounded-md">
                تعديل
            </button>
            <button @click="() => showHandler(sale.id)"
                class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold p-2 rounded-md">
                عرض
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Sale } from '../Types';
import { ISO8601DateToHumanDate } from '@/services/helper/helperFunctions';

const props = defineProps({
    sale: {
        type: Object as () => Sale,
        required: true
    },
    customerName: {
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

const updateHandler = (sale:Sale) => {
    props.update(sale);
}

const showHandler = (id: number) => {
    props.show(id);
}
</script>