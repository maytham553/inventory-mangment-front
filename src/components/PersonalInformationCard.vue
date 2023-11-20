<template>
    <div>
            <div class="pb-3 pr-3 pt-3 border bg-white   w-[286px] h-[190px]  drop-shadow-lg 
    hover:drop-shadow-xl rounded-lg   flex flex-col justify-between items-start">
        <div class="flex items-center gap-4 justify-start">

            <div className="flex justify-between relative">
                <div class="flex w-20 h-20 justify-start  items-center p-2 bg-gray-200 rounded-full">
                    <UserIcon :size=100 strokeColor="rgba(0,0,0,0.1)" fillColor="#172350" />
                </div>
    
                <div class="absolute right-0 top-[58px] p-1 h-6 w-6 flex justify-center text-xs items-center rounded-full text-gray-50 bg-primary/80">
                 {{ id }}
                </div>
            </div>
       
            <div class="p-1 flex gap-2 flex-col justify-center items-center ">
               
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
                <div>
                    <span class="font-bold"></span>
                    <span>{{ governorate }}</span>
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center mt-4 justify-evenly w-full">
            <button @click="updateHandler"
                class="text-xs bg-primary hover:bg-[#1a2c47] text-white font-bold p-2 rounded-md">
               <Edit />
            </button>
            <button @click="showHandler"
                class="text-xs bg-[#C5E898] hover:bg-[#40765c] text-white font-bold p-2 rounded-md">
                <Show />
            </button>
            <button @click="deleteHandler"
                class="text-xs bg-red-600 hover:bg-red-800 text-white font-bold p-2 rounded-md">
                <Delete />
            </button>
        </div>
    </div>
        </div>
    
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import UserIcon from '@/components/icons/UserIcon.vue';
import Delete from "../components/icons/Delete.vue";
import Edit from "../components/icons/Edit.vue"
import Show from "../components/icons/Show.vue"


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
    show: {
        type: Function,
        required: true
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