<template>
  <div class="header">
    <button type="button" class="btn font_bold btn_back" @click="goToBack" v-show="isNotHome">
      &lt;
    </button>
    <h1 class="font_bold">Todo List</h1>
    <button type="button" class="btn btn_blue font_bold btn_add" @click="goToAdd" v-show="isHome">
      추가
    </button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const isHome = computed(() => route.path === '/')
const isNotHome = computed(() => route.path !== '/')

const goToAdd = () => {
  router.push('/add')
}

const goToBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.header {
  padding: 20px;
  position: relative;

  h1 {
    font-size: 24px;
    text-align: center;
  }

  .btn_add {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .btn_back {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 24px;
  }
}
</style>
