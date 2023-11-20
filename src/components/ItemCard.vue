<template>
  <div
    class="p-3 flex border flex-col   items-stretch justify-between w-[330px]
     bg-white hover:drop-shadow-xl rounded-lg"
  >
    <div>
      <h2 class="text-right pr-4 text-blue-500 font-bold text-2xl mb-5">
        {{ name }}
      </h2>

      <div class="flex items-center rtl text-right justify-start hap-3">
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="40px"
          width="40px"
          class="text-blue-500 p-2"
        >
          <path
            d="M872 394c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H708V152c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v166H400V152c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v166H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h168v236H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h168v166c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V706h228v166c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V706h164c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H708V394h164zM628 630H400V394h228v236z"
          />
        </svg>

        <p>التسلسل: {{ id }}</p>
      </div>

      <div class="flex items-center rtl text-right justify-start hap-3">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="40px"
          width="40px"
          class="text-blue-500 p-2"
        >
          <path
            d="M3 11h2v2H3v-2m8-6h2v4h-2V5m-2 6h4v4h-2v-2H9v-2m6 0h2v2h2v-2h2v2h-2v2h2v4h-2v2h-2v-2h-4v2h-2v-4h4v-2h2v-2h-2v-2m4 8v-4h-2v4h2M15 3h6v6h-6V3m2 2v2h2V5h-2M3 3h6v6H3V3m2 2v2h2V5H5M3 15h6v6H3v-6m2 2v2h2v-2H5z"
          />
        </svg>

        <p>الكود: {{ code }}</p>
      </div>

      <div
        v-if="price"
        class="flex items-center rtl text-right justify-start hap-3"
      >
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          height="40px"
          width="40px"
          class="text-blue-500 p-2"
        >
          <path
            d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
          />
        </svg>

        <p>السعر: {{ price }}</p>
      </div>
      <div class="flex items-center rtl text-right justify-start hap-3">
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          height="40px"
          width="40px"
          class="text-blue-500 p-2"
        >
          <path
            d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
          />
        </svg>

        <p>التكلفة: {{ cost }}</p>
      </div>
      <div class="flex items-center rtl text-right justify-start hap-3">
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="40px"
          width="40px"
          class="text-blue-500 p-2"
        >
          <path
            d="M342 472h342c.4 0 .9 0 1.3-.1 4.4-.7 7.3-4.8 6.6-9.2l-40.2-248c-.6-3.9-4-6.7-7.9-6.7H382.2c-3.9 0-7.3 2.8-7.9 6.7l-40.2 248c-.1.4-.1.9-.1 1.3 0 4.4 3.6 8 8 8zm91.2-196h159.5l20.7 128h-201l20.8-128zm2.5 282.7c-.6-3.9-4-6.7-7.9-6.7H166.2c-3.9 0-7.3 2.8-7.9 6.7l-40.2 248c-.1.4-.1.9-.1 1.3 0 4.4 3.6 8 8 8h342c.4 0 .9 0 1.3-.1 4.4-.7 7.3-4.8 6.6-9.2l-40.2-248zM196.5 748l20.7-128h159.5l20.7 128H196.5zm709.4 58.7l-40.2-248c-.6-3.9-4-6.7-7.9-6.7H596.2c-3.9 0-7.3 2.8-7.9 6.7l-40.2 248c-.1.4-.1.9-.1 1.3 0 4.4 3.6 8 8 8h342c.4 0 .9 0 1.3-.1 4.3-.7 7.3-4.8 6.6-9.2zM626.5 748l20.7-128h159.5l20.7 128H626.5z"
          />
        </svg>
        <p>الكمية: {{ quantity }}</p>
      </div>

      <div v-if="note" class="overflow-hidden">
        <span>ملاحظات : </span>
        <span>{{ note }}</span>
      </div>
    </div>
    <div class="flex mt-5 justify-evenly items-center">
      <button
        @click="updateHandler"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg flex gap-2 items-center"
      >
        تعديل
        <svg viewBox="0 0 24 24" fill="currentColor" height="20px" width="20px">
          <path
            d="M6.3 12.3l10-10a1 1 0 011.4 0l4 4a1 1 0 010 1.4l-10 10a1 1 0 01-.7.3H7a1 1 0 01-1-1v-4a1 1 0 01.3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 012 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2h6a1 1 0 010 2H4v14h14v-6z"
          />
        </svg>
      </button>
      <button
        @click="deleteHandler"
        class="bg-red-500 hover:bg-red-700 text-white rounded-lg font-bold py-2 px-3 flex gap-2 items-center"
      >
        حذف
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="20px"
          width="20px"
        >
          <path
            d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  cost: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  update: {
    type: Function,
    required: true,
  },
  delete: {
    type: Function,
    required: true,
  },
});

const updateHandler = (event: MouseEvent): void => {
  props.update(event);
};

const deleteHandler = (event: MouseEvent): void => {
  props.delete(event);
};
</script>
