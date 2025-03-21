<template>
  <div v-if="todos.length > 0">
    <div
      v-for="todo in todos"
      :key="todo.id"
      @mousedown="clickStart(todo.id)"
      @mouseup="clickEnd"
      @mouseleave="clickEnd"
      class="todoItem"
    >
      <h3 @click="emit('goDetail', todo.id)">{{ todo.title }}</h3>
      <div>
        <button
          type="button"
          @click="emit('toggleTodo', todo.id)"
          :class="{ completed: todo.completed }"
        >
          {{ todo.completed ? '완료' : '미완료' }}
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="noTodo">할 일이 없습니다.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  todos: {
    type: Array,
  },
})
const emit = defineEmits(['toggleTodo', 'deleteTodo', 'goDetail'])

const isClick = ref(false)

const clickStart = (id) => {
  isClick.value = true
  setTimeout(() => {
    if (isClick.value) {
      emit('deleteTodo', id)
    }
  }, 500)
}
const clickEnd = () => {
  isClick.value = false
}
</script>

<style lang="scss" scoped>
.todoItem {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 16px;
    font-weight: bold;
  }
  button {
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.completed {
      background-color: #ccc;
      color: #fff;
    }
  }
}
.noTodo {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 6;
  background-color: #d7d7d7;
  border-radius: 5px;
  padding: 10px;
}
</style>
