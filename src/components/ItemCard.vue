<template>
  <div class="flex m-2 items-center justify-center rounded-lg py-[2px] rounded-tl-[18%] w-[334px] bg-gradient-to-r from-[#29ADB2] via-red-400 to-[#C5E898]">
    <div class="p-3 pt-6 pr-6 flex flex-col h-full justify-between w-[330px] rounded-tl-[18%] bg-white hover:drop-shadow-xl rounded-lg">
      <div>
        <div>
          <span>id : </span>
          <span>{{ id }}</span>
        </div>
        <div>
          <span>الأسم : </span>
          <span>{{ name }}</span>
        </div>
        <div>
          <span>الكود : </span>
          <span>{{ code }}</span>
        </div>
        <div v-if="price">
          <span>السعر : </span>
          <span>{{ price }}</span>
        </div>
        <div>
          <span>التكلفة : </span>
          <span>{{ cost }}</span>
        </div>
        <div>
          <span>الكمية : </span>
          <span>{{ quantity }}</span>
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
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="20px"
            width="20px"
          >
            <path d="M6.3 12.3l10-10a1 1 0 011.4 0l4 4a1 1 0 010 1.4l-10 10a1 1 0 01-.7.3H7a1 1 0 01-1-1v-4a1 1 0 01.3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 012 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2h6a1 1 0 010 2H4v14h14v-6z" />
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
            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
          </svg>
        </button>
      </div>
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
