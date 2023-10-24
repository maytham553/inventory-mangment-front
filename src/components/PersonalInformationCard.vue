<template>
    
    <div class="p-4 max-w-sm max-h-sm bg-gray-100 drop-shadow-xl rounded-lg flex flex-col  w-content">
       <div class="flex justify-center p-10 mb-5 bg-gradient-to-b from-sky-300 to-indigo-300 rounded">
         <UserIcon size="150" strokeColor="rgba(0,0,0,0.1)" fillColor="#172350"/>
           </div>
        <div class="p-1 flex flex-col space-y-3"> 
             <div>
                <span class="font-bold"></span>
                <span>{{ id }}</span>
            </div>
        <div>
            <span class="font-bold"></span>
            <span>{{ name }}</span>
        </div>
        <div v-if="email">
            <span class="font-bold"></span>
            <span>{{ email }}</span>
        </div>
        <div>
            <span class="font-bold"></span>
            <span>{{ phone }}</span>
        </div>
        <!-- <div>
            <span class="font-bold">العنوان : </span>
            <span>{{ address }}</span>
        </div> -->
        <div>
            <span class="font-bold"></span>
            <span>{{ governorate }}</span>
        </div>
        <!-- <div v-if="note">
          <span class="font-bold">ملاحظات : </span>
          <span>{{ showMore ? truncatedNote : note }}</span>
          <a v-if="showMore" @click="expandNote" class="cursor-pointer text-green-500 text-s">أكمل القراءة</a>
        </div> -->
        <div class="flex flex-row items-center justify-center w-full   ">
            <button @click="updateHandler" class="text-xs bg-[#2b4162] hover:bg-[#1a2c47] text-white font-bold py-2 px-4 rounded-r-md">
                تعديل
            </button>
            <button @click="deleteHandler" class="text-xs bg-[#d11a2a] hover:bg-[#a60c1c] text-white font-bold py-2 px-4 ">
                حذف
            </button>
            <button @click="showHandler" class="text-xs bg-[#53917e] hover:bg-[#40765c] text-white font-bold py-2 px-4 rounded-l-md">
                عرض
            </button>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import UserIcon from '@/components/icons/UserIcon.vue';

const props = defineProps({
    id:{
        type:Number,
        required:true
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

const maxLength = 30;

const truncatedNote = ref(props.note && props.note.length > maxLength ? `${props.note.slice(0, maxLength)}...` : props.note);
const showMore = computed(() => props.note && props.note.length > maxLength);

const expandNote = () => {
    truncatedNote.value = props.note;
}
</script>