<script setup lang="ts">
import IconCapsule from "./IconCapsule.vue";
</script>

<template>
  <div class="home-view">
    <video src="@/assets/nothing-ahead.mp4" autoplay muted loop></video>
    <div class="content">
      <IconCapsule />
      <div class="title">时间胶囊</div>
      <div class="button-group">
        <button @click="$router.push('/put')">
          <div>Put</div>
          <div>添加</div>
        </button>
        <button @click="$router.push('/open')">
          <div>Open</div>
          <div>打开</div>
        </button>
      </div>
      <div class="hint">
        <a href="">什么是时间胶囊？</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-view {
  display: flex;
  align-items: center;
  position: relative;

  > video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
  }

  > .content {
    position: relative;
    top: -150px;
    width: 500px;
    margin: 0 auto;
    text-align: center;

    > svg {
      width: 350px;
      height: 350px;
    }

    > .title {
      font-size: 40px;
    }

    > .button-group {
      margin-top: 20px;
      font-size: 26px;

      > button {
        background: none;
      }

      > button:hover {
        color: var(--primary-color);
      }

      > button:last-child {
        margin-left: 100px;
      }
    }

    > .hint {
      margin-top: 50px;

      > a {
        color: #eee;
      }
    }
  }
}
</style>
