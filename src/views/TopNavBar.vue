<script setup lang="ts">
import IconCapsule from "./IconCapsule.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="top-nav-bar">
    <div class="content">
      <div class="logo" @click="$router.push('/')">
        <IconCapsule />
        <div class="title">时间胶囊</div>
      </div>
      <nav>
        <RouterLink :to="'/'">首页</RouterLink>
        <RouterLink :to="'/put'" :class="{ active: $route.path === '/put' }">添加</RouterLink>
        <RouterLink :to="'/open'" :class="{ active: $route.path.startsWith('/open') }">打开</RouterLink>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
.top-nav-bar {
  height: 70px;
  padding: 10px;

  > .content {
    width: var(--content-width);
    margin: 0 auto;
    display: flex;
    align-items: center;

    > .logo {
      cursor: pointer;
      display: flex;
      align-items: center;

      > .icon {
        width: 50px;
        height: 50px;
      }

      > .title {
        font-size: 26px;
      }
    }

    > nav {

      > a {
        display: inline-block;
        font-size: 20px;
        padding: 5px;
      }

      > a:first-child {
        margin-left: 50px;
      }

      > a:not(:last-child) {
        margin-right: 20px;
      }

      > a.active {
        color: #fff;
        background-color: var(--primary-color);
      }
    }
  }
}
</style>
