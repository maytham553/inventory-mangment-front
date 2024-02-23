<template>
    <div>
        <button @click="toggleTable" class="flex items-center justify-between w-full mt-6   bg-gray-200 p-3 rounded-lg ">

            <h2 class="text-title-md font-bold text-black  ">مبيعات اليوم</h2>
            <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" :class="{
                'w-3 h-3 mr-2 text-black transform rotate-180': showTable,
                'w-3 h-3 mr-2 text-black': !showTable
            }" class="transition-transform duration-300">
                <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" />
            </svg>
        </button>



        <div v-if="showTable" class="space-y-2 w-full p-3">
            <div class="grid grid-cols-5  text-center text-md font-medium text-gray-500 ">

                <div class="text-right ">
                    الاسم</div>
                <div>
                    السعر</div>
                <div>
                    الكمية</div>
                <div>
                    الكلفة</div>

                <div>
                    المجموع</div>
            </div>
            <div v-for="(sale, saleIndex) in sales" :key="saleIndex">
                <div class="py-1 bg-gray-200  w-full grid grid-cols-3   text-gray-700  text-center ">
                    <p>
                        المستخدم:
                        <span class="font-semibold">

                            {{ sale.user_name }}
                            
                        </span>
                    </p>
                    <p> 
                        الزبون:
                        <span class="font-semibold">

                            
                            {{ sale.customer_name }}
                        </span>

                    </p>
                    <p>
                        الربح:
                        <span class="font-semibold">

                            
                            {{ sale.profit }}
                        </span>
                    </p>
                     
                    </div>

                <div v-for="(product, productIndex) in sale.products" :key="productIndex" :class="{
                    'grid grid-cols-5 p-2 items-center justify-start gap-10 w-full border-gray-200 border-b': true,
                    'last:border-b-0': productIndex === sale.products.length - 1
                }">
                    <div class="text-right">{{ product.name }}</div>
                    <div class=" text-center">{{ product.quantity }}
                    </div>
                    <div class=" text-center">{{ product.price }}</div>
                    <div class=" text-center">{{ product.cost }}</div>
                    <div class=" text-center">{{ product.total }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { DashboardSale } from "../../Types";

const props = defineProps({
    sales: {
        type: Array as () => DashboardSale[],
        required: true
    },
})
const showTable = ref(false);

function toggleTable() {
    showTable.value = !showTable.value;
}
</script>
  
 