<template>
    <div class="flex flex-wrap items-start justify-start py-3   relative   gap-10">
        <div v-for="(sale, saleIndex) in sales" :key="saleIndex">
            <div class="flex justify-between   relative items-center ">
                <div @click="toggleDropdown(saleIndex)"
                    class="cursor-pointer bg-secondary/50  py-1 px-2 rounded flex justify-between items-center ">
                    <p>{{ sale.user_name }}</p>


                    <svg @click.stop="toggleDropdown(saleIndex)" :class="{ 'rotate-180': isOpen(saleIndex) }"
                        fill="currentColor" viewBox="0 0 16 16" height="10em" width="10em"
                        class="w-3 mr-2 text-black h-6 transform transition-transform duration-300">
                        <path fill-rule="evenodd"
                            d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" />
                    </svg>
                </div>
                <div v-if="isOpen(saleIndex)" class=" absolute top-12  over bg-black  text-white p-2 rounded z-10">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th
                                    class="pl-4 pr-1 py-3 rounded-ss  bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الاسم</th>
                                <th
                                    class="pl-4 pr-1 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    السعر</th>
                                <th
                                    class="pl-4 pr-1 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الكمية</th>
                                <th
                                    class="pl-4 pr-1 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الكلفة</th>
                                <th
                                    class="pl-4 pr-1 py-3 rounded-es rounded-se bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    المجموع</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, productIndex) in sale.products" :key="productIndex"
                                class="hover:bg-secondary hover:text-black">
                                <td class="pl-4 pr-1 py-4 whitespace-nowrap border-b border-white/30 ">{{ product.name }}
                                </td>
                                <td 
                                class="pl-4 pr-1 py-4 whitespace-nowrap border-b border-white/30 ">{{ product.quantity
                                }}</td>
                                <td class="pl-4 pr-1 py-4 whitespace-nowrap border-b border-white/30 ">{{ product.price }}
                                </td>
                                <td class="pl-4 pr-1 py-4 whitespace-nowrap border-b border-white/30 ">{{ product.cost }}
                                </td>
                                <td class="pl-4 pr-1 py-4   whitespace-nowrap border-b border-white/30 ">{{ product.total }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import type { DashboardSale } from "../../Types";
import { ref } from 'vue';

const props = defineProps<{
    sales: DashboardSale[];
}>()

const openDropdownIndices = ref<number[]>([]);

const toggleDropdown = (index: number) => {
    if (openDropdownIndices.value.includes(index)) {
        openDropdownIndices.value = openDropdownIndices.value.filter(i => i !== index);
    } else {
        // Close all open dropdowns
        openDropdownIndices.value = [];
        // Open the clicked dropdown
        openDropdownIndices.value.push(index);
    }
};
const isOpen = (index: number) => {
    return openDropdownIndices.value.includes(index);
};
</script>