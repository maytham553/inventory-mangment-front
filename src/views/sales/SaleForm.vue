<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 h-full ">
        <div class="mb-4 h-2/3 overflow-auto bg-gray-200 p-2 rounded-xl  ">
            <table class="w-full">
                <thead>
                    <tr>
                        <th>المادة </th>
                        <th>الكمية</th>
                        <th>السعر</th>
                        <th>مبلغ الخصم</th>
                        <th>نسبة الخصم</th>
                        <th>المجموع الجزئي</th>
                        <th>المبلغ الكلي</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in sale.products" :key="product.id" class="bg-gray-100 hover:bg-gray-300 mb-2">
                        <td>{{ product.name }}</td>
                        <td>
                            <input placeholder="الكمية" type="number" id="quantity" v-model="product.quantity" />
                        </td>
                        <td>
                            <input placeholder="السعر" type="number" id="unitPrice" v-model="product.unit_price" />
                        </td>
                        <td>
                            <input placeholder="مبلغ الخصم" type="number" id="discountAmount"
                                v-model="product.discount_amount" />
                        </td>
                        <td>
                            {{ product.discount_percentage }}
                        </td>
                        <td>{{ product.subtotal }}</td>
                        <td>{{ product.total }}</td>
                        <td>
                            <button @click="removeItem(product.id!)" type="button"
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                حذف
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="h-1/3 overflow-hidden flex  gap-1 ">
            <div class="flex w-1/2 flex-col gap-1">

                <div class="flex  items-center w-72  justify-between  ">
                    <label for="discountAmount">مبلغ الخصم</label>
                    <input placeholder="مبلغ الخصم" type="number" id="discountAmount" v-model="sale.discount_amount"
                        class="form-input   p-1 rounded-lg bg-gray-200" />
                </div>

                <div class="flex  items-center w-72  justify-between  ">
                    <label for="discountPercentage">نسبة الخصم</label>
                    <span placeholder="نسبة الخصم" type="number" id="discountPercentage"
                        class="form-input   p-1 rounded-lg bg-gray-200 ">
                        {{ sale.discount_percentage }}
                    </span>
                </div>

                <div class="flex  items-center w-72  justify-between ">
                    <label for="subtotalAmount">المجموع الجزئي</label>
                    <span class="form-input   p-1 rounded-lg bg-gray-200">
                        {{ sale.subtotal_amount }}
                    </span>
                </div>

                <div class="flex  items-center w-72  justify-between ">
                    <label for="totalAmount">المجموع الكلي</label>
                    <span class="form-input   p-1 rounded-lg bg-gray-200">
                        {{ sale.total_amount }}
                    </span>
                </div>
            </div>
            <div class="flex w-1/2 flex-col gap-1 justify-between">
                <div class="flex flex-col gap-1">
                    <div class="flex  items-center w-72  justify-between  ">
                        <label for="status">الحالة</label>
                        <select id="status" v-model="sale.status" required class="form-select   p-1 rounded-lg bg-gray-200">
                            <option value="" disabled selected>اختر الحالة</option>
                            <option v-for="status in SaleStatus" :key="status" :value="status">
                                {{ status }}
                            </option>
                        </select>
                    </div>

                    <div class="flex  items-center w-72  justify-between  ">
                        <label for="note">ملاحظات</label>
                        <textarea placeholder="ملاحظات" id="note" v-model="sale.note"
                            class="form-textarea  max-h-32 p-1 rounded-lg bg-gray-200">
                </textarea>
                    </div>
                </div>


                <div class="flex  items-center w-72  justify-center gap-2  ">
                    <button type="submit"
                        class="bg-blue-500 h-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  flex justify-center gap-3"
                        :class="{ 'bg-blue-300': status.loading }" :disabled="status.loading">
                        {{ submitButtonText }}
                        <Loading v-if="status.loading" class="-mr-1 ml-3" />
                    </button>
                    <button type="button" @click="handleSubmitAndPrint"
                        class="bg-blue-500 h-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  flex justify-center gap-3"
                        :class="{ 'bg-blue-300': status.loading }" :disabled="status.loading">
                        طباعة
                    </button>
                    <div v-if="status.error" class="text-red-500 text-sm">
                        {{ status.message }}
                    </div>
                </div>

            </div>
        </div>
    </form>
</template>

<script lang="ts" setup>
import type { Product, Sale, SaleProduct, Status } from '../../Types';
import { SaleStatus } from '../../Types';
import { computed, defineProps, onBeforeUpdate, onUpdated, watch } from 'vue';
import { sumTotal } from './../../services/helper/helperFunctions'
import Loading from '../../components/icons/Loading.vue';

const props = defineProps({
    sale: {
        type: Object as () => Sale,
        required: true
    },
    status: {
        type: Object as () => Status,
        required: true
    },
    removeItem: {
        type: Function,
        required: true
    },
    onSubmit: {
        type: Function,
        required: true
    },
    submitButtonText: {
        type: String,
        required: true
    },
    reCalculateSaleAfterChange: {
        type: Function,
        required: true
    }
})


const handleSubmit = async () => {
    await props.onSubmit(props.sale);
}
const handleSubmitAndPrint = async () => {
    await props.onSubmit(props.sale, true);
}
const removeItem = (productId: number) => {
    props.removeItem(productId);
}

onBeforeUpdate(() => {
    props.reCalculateSaleAfterChange()
})

</script>