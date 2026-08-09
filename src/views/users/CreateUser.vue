<template>
  <UserForm
    :status="status"
    :onSubmit="createHandler"
    submitButtonText="انشاء"
    :passwordRequired="true"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type Status, type User } from '../../Types';
import UserForm from './UserForm.vue';

const props = defineProps({
    status: {
        type: Object as () => Status,
        required: true,
    },
    create: {
        type: Function,
        required: true,
    },
});

const createHandler = async (data: User) => {
    await props.create(data);
};
</script>
