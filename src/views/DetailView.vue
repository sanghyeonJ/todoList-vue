<template>
  <div>
    <h3>{{ todo.title }}</h3>
    <p>{{ todo.description }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@/assets/composables/localstorage'

const { getItem } = useLocalStorage()
const route = useRoute()
const id = route.params.id

const todos = ref(getItem('todos'))
const todo = computed(() => todos.value.find((todo) => todo.id === parseInt(id)))
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    font-size: 24px;
    font-weight: bold;
  }
  p {
    font-size: 16px;
  }
}
</style>
