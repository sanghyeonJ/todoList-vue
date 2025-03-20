<template>
  <div class="header">
    <h1 class="font_bold">Todo List</h1>
    <button type="button" class="btn btn_blue font_bold btn_add">추가</button>
  </div>
</template>

<script setup></script>

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
}
</style>
