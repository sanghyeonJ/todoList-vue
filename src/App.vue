<template>
  <div class="app">
    <AppHeader />
    <AppView />
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppView from '@/components/layout/AppView.vue'
</script>

<style lang="scss" scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
