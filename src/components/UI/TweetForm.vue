<template>
  <form @submit.prevent="onSubmit"></form>
  <textarea v-model="text"></textarea>
  <button @click="onSubmit" class="btn btnPrimary">Submit</button>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
const emit = defineEmits(['onSubmit'])
const onSubmit = () => {
  emit('onSubmit', text.value)
  text.value = ''
}
</script>
