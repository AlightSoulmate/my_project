import userApi, { User } from '../apis/userApi'
import { defineStore } from 'pinia'
import store from '@/utils/store'
import { CacheEnum } from '@/enum/cacheEnum'
export default defineStore('history', {
  state: () => {
    return {
      history: [
        {
          question: "西湖风景区怎么样？",
          answer:
            "西湖风景区是杭州最著名的景点之一，以湖光山色、古典建筑、花园景观等著称。",
        },
        {
          question: "灵隐寺有什么特色？",
          answer:
            "灵隐寺是杭州的著名古刹，以千年古建筑、悠久的历史和灵山秀水而闻名。",
        },
        {
          question: "雷峰塔是杭州的哪个景点？",
          answer:
            "雷峰塔位于西湖边，是杭州的标志性建筑之一，也是游览西湖风景区的重要景点。",
        },
        {
          question: "西溪湿地适合带小孩吗？",
          answer:
            "西溪湿地是一个自然生态保护区，适合带小孩游玩，可以观赏自然风光和体验户外活动。",
        },
        {
          question: "千岛湖可以游泳吗？",
          answer:
            "千岛湖是一个著名的旅游景点，可以游泳，但需要注意安全，遵守相关规定。",
        },
        {
          question: "富阳茶园的开放时间是多久？",
          answer:
            "富阳茶园的开放时间根据季节和具体情况可能有所不同，请提前查询相关信息。",
        },
        {
          question: "杭州宋城的门票价格是多少？",
          answer:
            "杭州宋城的门票价格根据不同的票种和活动有所不同，请查询官方网站或当地旅游咨询处了解详情。",
        },
        {
          question: "龙井茶园有什么特色茶叶？",
          answer:
            "龙井茶园产出的龙井茶是中国的名茶之一，以其独特的清香和口感而闻名。",
        },
        {
          question: "杭州动物园的动物种类有哪些？",
          answer:
            "杭州动物园有各种动物，包括大熊猫、长颈鹿、孔雀、狮子等，适合家庭游玩。",
        },
        {
          question: "九溪烟树的美景在哪个季节？",
          answer:
            "九溪烟树四季皆美，春夏秋冬各有景致，但以春季樱花盛开和秋季红叶满山为最佳观赏时节。",
        },
      ].map(item => {
        return [
          { role: "user", question: item.question },
          { role: "machine", answer: item.answer }
        ];
      }).flat(),
    }
  },
  actions: {
    async getUserHistory() {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        return this.history
      }
    },
    async updateUserHistory(data: any) {
      this.history = [...this.history, ...data]
    }
  },

})
