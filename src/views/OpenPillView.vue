<script setup lang="ts">
import TopNavBar from "./TopNavBar.vue";
import ButtonPrimary from "./ButtonPrimary.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const key = ref("");

const route = useRoute();
watch(route.params, async (toParams, prevParams) => {
  // TODO: fetch pill data
});

const pill = {
  name: "someone",
  date: "2022-07-01",
  content:
    "“时间胶囊”是一个给未来的留言板，你可以为自己、朋友、爱人、家人或者任何人留下你现在想对他们说的话，并且设置一个未来能够打开“时间胶囊”的时间，这样他们就能在未来的某天通过网站给你的密码来这里打开“时间胶囊”，读到你的留言。",
  hint: "时间还没到，请耐心等待",
};
</script>

<template>
  <div class="open-pill-view">
    <TopNavBar />
    <div class="content">
      <div class="title">打开胶囊</div>
      <label for="key">胶囊 Key: </label>
      <input type="text" v-model="key" />
      <ButtonPrimary @click="$router.push(`/open/${key}`)"
        >打开胶囊</ButtonPrimary
      >

      <div class="open">
        <div class="title">{{ pill.name }} 在 {{ pill.date }} 对你说：</div>
        <div class="content">{{ pill.content }}</div>
      </div>
      <div class="close">
        <div class="title">
          这个胶囊 {{ pill.date }} 到期，{{ pill.name }} 对你说：
        </div>
        <div class="content">{{ pill.hint }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.open-pill-view > .content {
  width: var(--content-width);
  margin: 0 auto;

  > .title {
    font-size: 20px;
    margin: 20px 0;
  }

  > input {
    margin: 0 10px;
  }

  > .open,
  > .close {
    width: 600px;
    margin-top: 30px;
  }

  .title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .content {
    border: 1px solid var(--primary-color);
    padding: 10px;
    font-family: var(--pill-content-font-family);
    line-height: 1.5em;
    font-size: 17px;
    line-break: anywhere;
  }
}
</style>
