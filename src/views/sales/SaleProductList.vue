<template>
    <div class="bg-gray-200 rounded-xl py-5  " > 
        <div v-if="status.error" class="text-red-500 text-sm">
            {{ status.message }}
        </div>
        <div v-if="status.loading" class="flex justify-center items-center">
            <Loading stroke-color="#8f8f8f" />
        </div>
        <div v-if="status.success"  >
            <div class="flex flex-wrap justify-center items-stretch gap-2">
                <div v-for="product in products " @click="() => handleClick(product)" :key="product.id"
                    class="bg-gray-100  hover:bg-gray-600 hover:text-gray-100 transition-all
                     duration-100  w-[40%] rounded-lg  justify-center items-center text-center cursor-pointer p-2">
                    <h2 class="font-black text-xs ">{{ product.name }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Product, Status } from '../../Types';
import Loading from '../../components/icons/Loading.vue';
const props = defineProps({
    products: {
        type: Array as () => Product[],
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

const handleClick = (data: Product) => {
    props.addItem(data);
}

const removeItem = (id: number) => {
    props.removeItem(id);
}

</script>