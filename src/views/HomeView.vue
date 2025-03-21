<!--
  - crud 기능구현
  - 로컬스토리지를 활용한 데이터 저장
  - 필터링 기능(완료 / 미완료)
  - 드래그 앤 드롭으로 순서 변경
-->
<template>
  <div class="search">
    <input type="text" placeholder="검색어를 입력하세요" v-model="search" />
  </div>
  <div class="filter">
    <button type="button" @click="filter = 'all'" :class="{ active: filter === 'all' }">
      전체
    </button>
    <button type="button" @click="filter = 'completed'" :class="{ active: filter === 'completed' }">
      완료
    </button>
    <button
      type="button"
      @click="filter = 'incomplete'"
      :class="{ active: filter === 'incomplete' }"
    >
      미완료
    </button>
  </div>
  <div class="todoList">
    <TodoItem
      :todos="filteredTodos"
      @toggleTodo="toggleTodo"
      @deleteTodo="deleteTodo"
      @goDetail="goDetail"
      ref="todoItem"
    />
  </div>
</template>

<script setup>
import { useLocalStorage } from '@/assets/composables/localstorage'
import { ref, watch } from 'vue'
import TodoItem from '@/components/TodoItem.vue'
import { useRouter } from 'vue-router'
const { getItem, setItem } = useLocalStorage()
const router = useRouter()

const todos = ref([])
const search = ref('')
const filter = ref('all')
const searchedTodos = ref([])
const filteredTodos = ref([])
const todoItem = ref(null)

// 할 일 목록 초기화
todos.value = getItem('todos') || []

// 할 일 목록 필터링
const setFilteredTodos = () => {
  if (search.value) {
    searchedTodos.value = todos.value.filter((todo) => {
      return todo.title.includes(search.value)
    })
  } else {
    searchedTodos.value = todos.value
  }

  filteredTodos.value = searchedTodos.value.filter((todo) => {
    if (filter.value === 'all') return true
    if (filter.value === 'completed') return todo.completed
    if (filter.value === 'incomplete') return !todo.completed
  })

  filteredTodos.value.sort((a, b) => {
    return b.id - a.id
  })
}
watch([todos, search, filter], setFilteredTodos)
setFilteredTodos()

// 할 일 완료 여부 토글
const toggleTodo = (id) => {
  todos.value = todos.value.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo
  })
  setItem('todos', todos.value)
}

// 할 일 삭제
const deleteTodo = (id) => {
  if (confirm('삭제?')) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }
  setItem('todos', todos.value)
}

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 20px;
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
  }
}
.filter {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &.active {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }
}
</style>
