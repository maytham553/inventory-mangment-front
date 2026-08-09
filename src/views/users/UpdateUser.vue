<template>
  <UserForm
    :status="status"
    :onSubmit="handleUpdate"
    submitButtonText="تعديل"
    :user="user"
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
    update: {
        type: Function,
        required: true,
    },
    user: {
        type: Object as () => User,
        required: true,
    },
});

const handleUpdate = async (data: User) => {
    await props.update(props.user.id, data);
}
</script>
