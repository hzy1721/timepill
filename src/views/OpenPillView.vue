<script setup lang="ts">
import TopNavBar from "./TopNavBar.vue";
import ButtonPrimary from "./ButtonPrimary.vue";
import { ref } from "vue";
import { findOnePill } from "@/scripts/api";
import { useRoute } from "vue-router";

const key = ref("");

const route = useRoute();
if (route.params.key && route.params.key.length > 0) {
  key.value = route.params.key as string;
  openPill();
}

let pill = ref({
  type: '',
  name: '',
  createTime: '',
  content: '',
  openTime: '',
  hint: ''
});

async function openPill() {
  if (key.value.length === 0) {
    return;
  }
  const pillInfo = await findOnePill(key.value);
  if (!pillInfo) {
    alert('key 不存在');
    return;
  }
  pill.value = pillInfo;
}
</script>

<template>
  <div class="open-pill-view">
    <TopNavBar />
    <div class="content">
      <div class="title">打开胶囊</div>
      <label for="key">胶囊 Key: </label>
      <input type="text" v-model="key" />
      <ButtonPrimary @click="openPill">打开胶囊</ButtonPrimary>

      <div class="open" v-if="pill.type === 'open'">
        <div class="title">{{ pill.name }} 在 {{ new Date(pill.createTime).toLocaleString() }} 对你说：</div>
        <div class="text-content">{{ pill.content }}</div>
      </div>
      <div class="close" v-else-if="pill.type === 'close'">
        <div class="title">
          这个胶囊 {{ new Date(pill.openTime).toLocaleString() }} 到期，{{ pill.name }} 对你说：
        </div>
        <div class="text-content">{{ pill.hint }}</div>
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
    width: 300px;
  }

  > .open,
  > .close {
    width: 600px;
    margin-top: 30px;
  }

  > .open > .title,
  > .close > .title {
    font-size: 18px;
    margin-bottom: 10px;
  }
}

.text-content {
  width: 600px;
  border: 1px solid var(--primary-color);
  padding: 10px;
  font-family: var(--pill-content-font-family);
  line-height: 1.5em;
  font-size: 17px;
  line-break: anywhere;
  white-space: pre-wrap;
}
</style>
