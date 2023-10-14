<template>
    
    <div class="p-4 max-w-sm max-h-sm bg-gray-100 drop-shadow-2xl rounded-lg flex flex-col w-content">
       <div class="mb-2">
        <img class="w-10 " src="src/icons/user2.png" alt="user's pic">
       </div>
        <div> 
        <div>
            <span class="font-bold">الأسم : </span>
            <span>{{ name }}</span>
        </div>
        <div v-if="email">
            <span class="font-bold">البريد الإلكتروني : </span>
            <span>{{ email }}</span>
        </div>
        <div>
            <span class="font-bold">رقم الهاتف : </span>
            <span>{{ phone }}</span>
        </div>
        <div>
            <span class="font-bold">العنوان : </span>
            <span>{{ address }}</span>
        </div>
        <div>
            <span class="font-bold">المحافظة : </span>
            <span>{{ governorate }}</span>
        </div>
        <div v-if="note">
          <span class="font-bold">ملاحظات : </span>
          <span>{{ showMore ? truncatedNote : note }}</span>
          <a v-if="showMore" @click="expandNote" class="cursor-pointer text-green-500 text-s">أكمل القراءة</a>
        </div>
        <div class="flex flex-row space-x-4 space-x-reverse mt-3 items-center">
            <button @click="updateHandler" class="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                تعديل
            </button>
            <button @click="deleteHandler" class="text-xs bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                حذف
            </button>
            <button @click="showHandler" class=" text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                عرض
            </button>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

const props = defineProps({
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

const maxLength = 30;

const truncatedNote = ref(props.note && props.note.length > maxLength ? `${props.note.slice(0, maxLength)}...` : props.note);
const showMore = computed(() => props.note && props.note.length > maxLength);

const expandNote = () => {
    truncatedNote.value = props.note;
}
</script>