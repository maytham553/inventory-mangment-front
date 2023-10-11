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
        <div v-if="email">
            <span>البريد الإلكتروني : </span>
            <span>{{ email }}</span>
        </div>
        <div>
            <span>رقم الهاتف : </span>
            <span>{{ phone }}</span>
        </div>
        <div>
            <span>العنوان : </span>
            <span>{{ address }}</span>
        </div>
        <div>
            <span>المحافظة : </span>
            <span>{{ governorate }}</span>
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
            <button @click="showHandler" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                عرض
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String || undefined,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    governorate: {
        type: String,
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
    show:{
        type:Function,
        required:true
    }
})

const updateHandler = (event: MouseEvent): void => {
    props.update(event)
}

const deleteHandler = (event: MouseEvent): void => {
    props.delete(event)
}

const showHandler = (event: MouseEvent): void => {
    props.show(event)
}
</script>