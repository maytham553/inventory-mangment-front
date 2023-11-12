<template>
    <div class="bg-gray-200 rounded-xl py-10 px-5  ">
        <div v-if="status.error" class="text-red-500 text-sm">
            {{ status.message }}
        </div>
        <div v-if="status.loading" class="flex justify-center items-center">
            <Loading stroke-color="#8f8f8f" />
        </div>
        <div v-if="status.success" class="flex flex-col gap-2 ">
            <div class="flex flex-row  flex-wrap justify-center items-center gap-5">
                <div v-for="rawMaterial in rawMaterials " @click="() => handleClick(rawMaterial)" :key="rawMaterial.id"
                    class="bg-gray-100  hover:bg-gray-600 hover:text-gray-100 transition-all duration-100 w-24 h-24 rounded-xl flex justify-center items-center text-center cursor-pointer p-2">
                    <h2 class="font-black text-xs ">{{ rawMaterial.name }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { RawMaterial, Status } from '../../Types';
import Loading from '@/components/icons/Loading.vue';
const props = defineProps({
    rawMaterials: {
        type: Array as () => RawMaterial[],
        required: true
    },
    addItem: {
        type: Function,
        required: true
    },
    removeItem: {
        type: Function,
        required: true
    },
    status: {
        type: Object as () => Status,
        required: true
    },
})

const handleClick = (data: RawMaterial) => {
    props.addItem(data);
}

const removeItem = (id: number) => {
    props.removeItem(id);
}

</script>