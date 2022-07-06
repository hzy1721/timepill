<script setup lang="ts">
import { computed, reactive } from "vue";
import TopNavBar from "./TopNavBar.vue";
import type { PutPillDto } from "@/dtos/PutPillDto";
import ButtonPrimary from "./ButtonPrimary.vue";

const pill: PutPillDto = reactive({
  name: "",
  email: "",
  date: new Date().toISOString().slice(0, 10),
  content: "",
  hint: "",
});

const errMsg = reactive({
  name: "",
  email: "",
  content: "",
});

function validateForm() {
  let success = true;
  errMsg.name = '';
  if (pill.name.length === 0) {
    errMsg.name = "请填写你的名字";
    success = false;
  }
  errMsg.email = '';
  if (pill.email.length === 0) {
    errMsg.email = "请填写你的邮箱";
    success = false;
  }
  errMsg.content = '';
  if (pill.content.length === 0) {
    errMsg.content = "内容不能为空";
    success = false;
  }
  return success;
}

function submitPutPill() {
  if (!validateForm()) {
    return;
  }
  console.log(pill);
}
</script>

<template>
  <div class="put-pill-view">
    <TopNavBar />
    <div class="content">
      <div class="title">添加胶囊</div>
      <form>
        <label for="name">你的名字</label>
        <span class="err-msg">{{ errMsg.name }}</span>
        <input
          type="text"
          id="name"
          v-model="pill.name"
          @change="validateForm"
        />

        <label for="email">你的邮箱</label>
        <span class="err-msg">{{ errMsg.email }}</span>
        <input
          type="email"
          id="email"
          v-model="pill.email"
          @change="validateForm"
        />

        <label for="date">打开时间</label>
        <input
          type="date"
          id="date"
          :min="new Date().toISOString().slice(0, 10)"
          v-model="pill.date"
        />
        <span class="hint">打开时间之前，胶囊内容是看不到的。</span>

        <label for="content">胶囊内容</label>
        <span class="err-msg">{{ errMsg.content }}</span>
        <textarea
          id="content"
          cols="50"
          rows="10"
          v-model="pill.content"
          @change="validateForm"
        ></textarea>
        <span class="hint">胶囊内容不能超过5000字。</span>

        <label for="hint">未到期提示信息</label>
        <textarea id="hint" cols="50" rows="3" v-model="pill.hint"></textarea>
        <span class="hint">在打开时间之前打开胶囊，会看到提示信息。</span>

        <ButtonPrimary @click.prevent="submitPutPill">添加胶囊</ButtonPrimary>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.put-pill-view > .content {
  width: var(--content-width);
  margin: 0 auto;

  > .title {
    font-size: 20px;
    margin: 20px 0;
  }

  > form {
    > span {
      font-size: 14px;
      color: var(--text-light-color);
    }

    > button {
      display: block;
      margin-top: 20px;
    }

    > .err-msg {
      font-size: 13px;
      color: red;
      margin-left: 10px;
    }

    > span.hint {
      display: block;
      margin: 5px 0;
    }
    
    > label {
      display: inline-block;
      margin-top: 10px;
    }

    input,
    textarea {
      display: block;
      margin: 5px 0;
    }
  }
}
</style>
