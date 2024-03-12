<template>
  <div class="h-full flex flex-col">
    <el-button type="info" text size="large" @click="handleClick">
      开启新对话
    </el-button>
    <section class="card flex-1 flex flex-col h-full overflow-y-scroll px-3">
      <historyButton v-for="history in histories" class="w-full">{{
        history.title
      }}</historyButton>
    </section>
    <section class="flex my-3 items-center ml-3">
      <el-avatar
        :size="40"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
      <div class="p-2 ml-2">name</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import historyButton from "./historyButton.vue";

const handleClick = () => {
  console.log("click");
};

const histories = [
  {
    title: "西湖风景区怎么样？",
  },
  {
    title: "灵隐寺有什么特色？",
  },
  {
    title: "雷峰塔是杭州的哪个景点？",
  },
  {
    title: "西溪湿地适合带小孩吗？",
  },
  {
    title: "千岛湖可以游泳吗？",
  },
  {
    title: "富阳茶园的开放时间是多久？",
  },
  {
    title: "杭州宋城的门票价格是多少？",
  },
  {
    title: "龙井茶园有什么特色茶叶？",
  },
  {
    title: "杭州动物园的动物种类有哪些？",
  },
  {
    title: "九溪烟树的美景在哪个季节？",
  },
  {
    title: "杭州植物园的植物有多少种类？",
  },
  {
    title: "西湖国家湿地公园的生态环境如何？",
  },
  {
    title: "钱塘江的游船服务是怎样的？",
  },
  {
    title: "六和塔的历史有多久？",
  },
  {
    title: "浙江自然博物馆的展览有哪些？",
  },
  {
    title: "西溪天堂的游玩项目有哪些？",
  },
  {
    title: "西兴古镇的文化遗产是什么？",
  },
  {
    title: "梅家坞茶园的品茗体验如何？",
  },
  {
    title: "宋城景区的主题表演是什么？",
  },
  {
    title: "龙井村的建筑特色有哪些？",
  },
  {
    title: "杭州城隍阁的历史背景是什么？",
  },
  {
    title: "千岛湖游船的航线有哪些？",
  },
  {
    title: "西溪湿地可以看到哪些野生动物？",
  },
  {
    title: "雷峰塔的建筑结构是什么样的？",
  },
  {
    title: "钱塘江的夜景有多美？",
  },
  {
    title: "杭州宋城的文化表演有哪些？",
  },
  {
    title: "灵隐寺的开放时间是多久？",
  },
  {
    title: "西湖风景区的周边有哪些特色小吃？",
  },
  {
    title: "龙井茶园的采茶季节是什么时候？",
  },
  {
    title: "富阳茶园有什么历史故事？",
  },
];
</script>

<style scoped lang="scss">
.el-button + .el-button {
  margin-left: 0px;
}

.el-card__body .el-button {
  padding: 24px;
}

/* 定义滚动条轨道 */
.card::-webkit-scrollbar-track {
  background-color: #929ca059; /* 设置轨道背景色 */
  border-radius: 10px; /* 轨道边框圆角 */
}
/* 定义滚动条 */
.card::-webkit-scrollbar {
  width: 5px; /* 设置滚动条宽度 */
  background-color: #f1f1f1; /* 设置滚动条背景色 */
}

/* 定义滚动条滑块 */
.card::-webkit-scrollbar-thumb {
  background-color: #878b8d; /* 设置滑块背景色 */
  border-radius: 10px; /* 轨道边框圆角 */
}
</style>
