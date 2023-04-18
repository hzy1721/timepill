<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import TopNavBar from "./TopNavBar.vue";
import type { PutPillDto } from "@/scripts/dto/PutPillDto";
import ButtonPrimary from "./ButtonPrimary.vue";
import { format } from "fecha";
import { createPill } from "@/scripts/api";
import ClipboardJS from "clipboard";

const nowTime = new Date();
const nowTimeString = format(nowTime, "YYYY-MM-DDTHH:mm");
const todayStartString = format(nowTime, "YYYY-MM-DDT00:00");
const todayStart = new Date(todayStartString);
const maxTimeString = "2100-12-31T23:59";
const maxTime = new Date(maxTimeString);

const pill: PutPillDto = reactive({
  name: "",
  email: "",
  openTime: nowTimeString,
  content: "",
  hint: "",
});

const errMsg = reactive({
  name: "",
  email: "",
  openTime: "",
  content: "",
});

function validateForm() {
  let success = true;
  errMsg.name = "";
  if (pill.name.length === 0) {
    errMsg.name = "请填写你的名字";
    success = false;
  } else if (pill.name.includes(" ")) {
    errMsg.name = "名字不能包含空格";
    success = false;
  }
  errMsg.email = "";
  if (pill.email.trim().length === 0) {
    errMsg.email = "请填写你的邮箱";
    success = false;
  } else if (!/^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(pill.email)) {
    errMsg.email = "邮箱格式错误";
    success = false;
  }
  errMsg.openTime = "";
  if (new Date(pill.openTime) < todayStart) {
    errMsg.openTime = "打开时间不能比今天早";
    success = false;
  } else if (new Date(pill.openTime) > maxTime) {
    errMsg.openTime = "时间指定得太远了，网站可能撑不到那时候 (2100年前)";
    success = false;
  }
  errMsg.content = "";
  if (pill.content.trim().length === 0) {
    errMsg.content = "内容不能为空";
    success = false;
  }
  return success;
}

const resultKey = ref("");

async function submitPutPill() {
  if (!validateForm()) {
    return;
  }
  const key = await createPill(pill);
  if (!key) {
    alert("添加失败");
    return;
  }
  resultKey.value = key;
}

const clipboard = new ClipboardJS("#btn-copy");
clipboard.on("success", function (e) {
  alert('复制成功');
  e.clearSelection();
});
</script>

<template>
  <div class="put-pill-view">
    <TopNavBar />
    <div class="content">
      <div class="title">添加胶囊</div>

      <form @submit.prevent="submitPutPill" v-show="resultKey.length === 0">
        <label for="name">你的名字</label>
        <span class="err-msg">{{ errMsg.name }}</span>
        <input
          type="text"
          id="name"
          v-model="pill.name"
          @change="validateForm"
          autocomplete="off"
        />

        <label for="email">你的邮箱</label>
        <span class="err-msg">{{ errMsg.email }}</span>
        <input
          type="email"
          id="email"
          v-model="pill.email"
          @change="validateForm"
          autocomplete="off"
        />

        <label for="date">打开时间</label>
        <span class="err-msg">{{ errMsg.openTime }}</span>
        <input
          type="datetime-local"
          id="date"
          :min="todayStartString"
          :max="maxTimeString"
          v-model="pill.openTime"
          @change="validateForm"
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

        <ButtonPrimary>添加胶囊</ButtonPrimary>
      </form>

      <div class="result-key" v-show="resultKey.length > 0">
        <label for="key">胶囊 Key: </label>
        <input id="key" type="text" v-model="resultKey" readonly />
        <ButtonPrimary id="btn-copy" data-clipboard-target="#key"
          >复制 Key</ButtonPrimary
        >
        <ButtonPrimary @click="$router.go(0)">继续添加</ButtonPrimary>
        <div class="text-content">现在你可以把 key 告诉别人了，胶囊到期后可以用这个 key 重新打开胶囊</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.put-pill-view > .content {
  width: var(--content-width);
  margin: 0 auto;
  padding-bottom: 50px;

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

    > input {
      width: 150px;
    }
  }

  > .result-key {
    > input {
      margin: 0 10px;
      width: 300px;
    }

    > button {
      margin-right: 10px;
    }

    > .text-content {
      margin-top: 20px;
    }
  }
}
</style>
