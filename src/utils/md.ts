import highlight from "highlight.js";
import 'highlight.js/styles/github.css';
import Markdown from "markdown-it";
const mdOptions = (Markdown!.Options = {
  html: true,        // 在源码中启用 HTML 标签
  linkify: true,     // 将类似 URL 的文本自动转换为链接。
  typographer: true, // 双 + 单引号替换对，当 typographer 启用时。
  breaks: true,      // 转换段落里的 '\n' 到 <br>。
  langPrefix: "language-",
  // 代码高亮
  highlight(str:any, lang:any) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return (
          `<div class="bg-orange-100 w-full rounded-lg px-6 my-4 shadow-lg">
            <code class="w-full px-4 my-2 ">
              ${highlight.highlight(lang, str, true).value}
            </code>
          </div>`
        );
      } catch (__) { }
    }
    return "";
  },
})

export const md = new Markdown(mdOptions);