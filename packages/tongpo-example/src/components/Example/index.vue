<template>
  <div class="example">
    <div class="example__header">
      <slot name="header">
        <div class="example__title">{{ title }}</div>
      </slot>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Example',
  props: {
    title: { type: String, default: null }
  }
}
</script>

<style lang="less" scoped>
  .example {
    padding: 15px;
    border: 1px solid pink;
    background-color: #fff;
    & + & {
      margin-top: 30px;
    }
    &__header {
      margin-bottom: 15px;
    }
    &__title {
      font-size: 16px;
      color: darkcyan;
    }
  }
</style>
