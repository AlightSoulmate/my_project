<template>
  <div class="h-full flex flex-col p-4 bg-orange-100">
    <button
      class="add flex justify-center py-3 duration-300 rounded-full hover:bg-white mb-6"
      @click="handleClick"
    >
      <div class="flex items-center">
        <Newlybuild
          class="duration-300 icon translate-x-10"
          theme="filled"
          size="32"
          fill="#2d3436"
        />
        <div class="duration-300 ml-3 opacity-0" @click="createSession">
          开启新对话
        </div>
      </div>
    </button>
    <section
      class="card py-3 flex-1 flex flex-col h-full overflow-y-scroll px-3 bg-orange-50 rounded-lg"
    >
      <historyButton
        v-for="(session, index) in sessions"
        class="w-full pl-3 duration-300 hover:bg-zinc-200 rounded-md"
        @click="switchSession(index)"
      >
        <template #title> 新的聊天 </template>
        <template #time>
          {{ session[session.length - 1].date }}
        </template>
        <template #length>
          {{ session.length + "条信息" }}
        </template>
      </historyButton>
    </section>
    <section
      class="flex my-3 items-center py-2 px-3 bg-white rounded-full duration-300 cursor-pointer hover:bg-zinc-200"
    >
      <el-dropdown class="w-full">
        <span class="el-dropdown-link w-full flex items-center">
          <el-avatar :size="40" src="/images/user.png" />
          <div class="ml-3">
            {{
              name || email || "user"
            }}
          </div>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Newlybuild } from "@icon-park/vue-next";
import historyButton from "./historyButton.vue";
import { getHistory } from "@/apis/historyApi";
import { User } from "@/apis/userApi";
import userStore from "@/store/userStore";
import { uniqueId } from "lodash";
import { logout } from "@/utils/user";
import { randomUUID } from "crypto";
import { v4 } from "uuid";
const sessions = ref(await userStore().getSessions());
const name = ref("");
const email = ref("");
const createSession = async () => {
  userStore().createSession([
    {
      id: v4(),
      role: "user",
      content: JSON.stringify({
        content: "hi",
      }),
      date: new Date().toUTCString(),
    },
  ]);
};
(await getHistory()
  .then((r) => r.json() as unknown as any)
  .then((r) => {
    name.value = r.name
    email.value = r.email
    console.log("🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸");
    console.log(r);
    console.log("🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸");
  })) as User;

const handleClick = () => {
  console.log("click");
};

const switchSession = (index: number) => {
  userStore().setSessionIndex(index);
};
</script>

<style scoped lang="scss">
.add {
  &:hover div {
    opacity: 1;
  }
  &:hover .icon {
    transform: translateX(-1rem);
  }
}
.el-button + .el-button {
  margin-left: 0px;
}

.el-card__body .el-button {
  padding: 24px;
}

/* 定义滚动条轨道 */
.card::-webkit-scrollbar-track {
  background-color: #b8bfc259; /* 设置轨道背景色 */
  border-radius: 10px; /* 轨道边框圆角 */
}
/* 定义滚动条 */
.card::-webkit-scrollbar {
  width: 5px; /* 设置滚动条宽度 */
  background-color: #f1f1f1; /* 设置滚动条背景色 */
}

/* 定义滚动条滑块 */
.card::-webkit-scrollbar-thumb {
  background-color: #c4c4c4; /* 设置滑块背景色 */
  border-radius: 10px; /* 轨道边框圆角 */
}
</style>
