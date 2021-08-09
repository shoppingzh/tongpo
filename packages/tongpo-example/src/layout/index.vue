<template>
  <section class="layout">
    <aside class="layout__aside">
      <Menu />
    </aside>
    <main class="layout__main">
      <router-view />
    </main>
  </section>
</template>

<script>
import Menu from './Menu.vue'

export default {
  components: { Menu },
  setup(props, ctx) {
  }
}
</script>

<style lang="less" scoped>
</style>