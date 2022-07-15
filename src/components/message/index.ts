import { h, render } from "vue";
import message from './message.vue'

type Options = {
  type: 'success' | 'error' | 'warning'
  text: string
  duration?: number
}

// Message({ type: 'success', text: '我是标题' })
// 封装到函数
// { text, type } 结构参数
// 参数 1 是配置对象
export function Message({ type, text, duration = 2000 }: Options) {
  // 创建一个 div 将其添加至 body
  const div = document.createElement('div')
  div.setAttribute('class', 'xtx-message-container')
  document.body.appendChild(div)
  // 创建 message 组件的虚拟 DOM
  const vnode = h(message, { type, text })
  // 渲染到 body
  render(vnode, div)
  // 开启定时器: 等 3 秒后让其消失
  setTimeout(() => {
    // 调用 render 函数, 传入 null
    render(null, div)
    // 移除 div
    div.remove()
  }, duration)
}

// 优化访问的方法: Message.success()
// 函数身上的方法: 静态方法
Message.success = function(text: string, duration: number = 2000) {
  Message({
    type: 'success',
    text,
    duration
  })
}

Message.error = function(text: string, duration: number = 2000) {
  Message({
    type: 'error',
    text,
    duration
  })
}

Message.warning = function(text: string, duration: number = 2000) {
  Message({
    type: 'warning',
    text,
    duration
  })
}
