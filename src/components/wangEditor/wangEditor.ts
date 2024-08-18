import wangEditor from 'wangeditor'
export default class {
  editor: wangEditor
  constructor(el: string, callback: Function, config: { [key: string]: any }) {
    this.editor = new wangEditor(el)
    // this.editor.config.uploadImgServer = '/upload-img'
    // this.editor.config.height = config.height
    Object.assign(this.editor.config, config)
    this.editor.config.onchange = callback
    this.editor.config.uploadImgHooks = this.uploadImage()
    this.editor.create()
    this.editor.txt.html(config.modelValue)
  }
  uploadImage() {
    return {
      customInsert(insertFn: Function, res: any) {
        // TS 语法
        // res 即服务端的返回结果

        console.log(res)
        insertFn(res.url, res.alt, res.href)

        // 从 res 中找到 url alt href ，然后插入图片
        // insertFn(res.url, res.alt, res.href)
      },
    }
  }
}
