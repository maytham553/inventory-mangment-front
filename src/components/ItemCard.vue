<template>
    <div class="p-4 max-w-sm w-[30%]   bg-gray-200  rounded-lg ">
        <div>
            <span>id : </span>
            <span>{{ id }}</span>
        </div>
        <div>
            <span>الأسم : </span>
            <span>{{ name }}</span>
        </div>
        <div>
            <span>الكود : </span>
            <span>{{ code }}</span>
        </div>
        <div v-if="price">
            <span>السعر : </span>
            <span>{{ price }}</span>
        </div>
        <div>
            <span>التكلفة : </span>
            <span>{{ cost }}</span>
        </div>
        <div>
            <span>الكمية : </span>
            <span>{{ quantity }}</span>
        </div>
        <div v-if="note">
            <span>ملاحظات : </span>
            <span>{{ note }}</span>
        </div>
        <div class="flex justify-between items-center">
            <button @click="updateHandler" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                تعديل
            </button>
            <button @click="deleteHandler" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                حذف
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    cost: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    update: {
        type: Function,
        required: true
    },
    delete: {
        type: Function,
        required: true
    },
})

const updateHandler = (event: MouseEvent): void => {
    props.update(event)
}
const deleteHandler = (event: MouseEvent): void => {
    props.delete(event)
}

</script>