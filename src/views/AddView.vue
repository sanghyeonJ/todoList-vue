<template>
  <div>
    <h3>할 일 추가</h3>
    <input type="text" v-model="title" placeholder="할 일을 입력하세요" />
    <textarea v-model="description" placeholder="설명을 입력하세요"></textarea>
    <button @click="addTodo" class="btn btn_blue">추가</button>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@/assets/composables/localstorage'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const { getItem, setItem } = useLocalStorage()
const router = useRouter()

const title = ref('')
const description = ref('')
const todos = ref([])
const newTodo = reactive({
  id: '',
  title: '',
  description: '',
  completed: false,
})
todos.value = getItem('todos') || []

const getId = computed(() => {
  if (todos.value.length === 0) {
    return 1
  } else {
    let maxId = 0
    for (const todo of todos.value) {
      if (todo.id > maxId) {
        maxId = todo.id
      }
    }
    return maxId + 1
  }
})

const setForm = () => {
  newTodo.id = getId.value
  newTodo.title = title.value
  newTodo.description = description.value
  newTodo.completed = false
}

const addTodo = () => {
  if (title.value === '') {
    alert('할 일을 입력하세요')
    return
  }
  if (description.value === '') {
    alert('설명을 입력하세요')
    return
  }
  setForm()
  todos.value.push(newTodo)
  setItem('todos', todos.value)

  alert('할 일이 추가되었습니다.')
  router.push('/')
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
  }
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
  }
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
  }
}
</style>
