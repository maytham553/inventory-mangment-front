<template>
    <div class="p-4 max-w-sm max-h-sm  bg-gray-200  rounded-lg ">
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

        <div class="flex justify-between items-center">
            <button @click="() => updateHandler(sale)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                تعديل
            </button>
            <button @click="() => showHandler(sale.id)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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