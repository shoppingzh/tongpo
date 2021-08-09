<template>
  <div class="menu">
    <router-link
      v-for="menu in menus"
      :key="menu.path"
      :to="menu.path"
      tag="div"
      class="menu-item">
      <div class="menu-item__title">{{ menu.title || '未命名菜单' }}</div>
    </router-link>
  </div>
</template>

<script>
import useRouteMenu from '@/hooks/useRouteMenu'

export default {
  setup() {
    const { menus } = useRouteMenu()

    return {
      menus
    }
  }
}
</script>

<style lang="less" scoped>
  .menu {
    &-item {
      position: relative;
      display: block;
      padding: 15px 20px;
      cursor: pointer;
      text-decoration: none;
      color: #333;
      &:before {
        content: "";
        position: absolute;
        left: 10px;
        top: 30%;
        bottom: 30%;
        width: 4px;
        background-color: orange;
        border-radius: 3px;
      }
      &:hover {
        background-color: #eee;
      }
    }
  }
</style>
