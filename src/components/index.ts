// 统一的注册所有的全局组件
import { App } from 'vue'
import Skeleton from '@/components/skeleton/index.vue'
import Carousel from '@/components/carousel/index.vue'
import More from '@/components/more/index.vue'
import BreadItem from './bread/item.vue'
import Bread from './bread/index.vue'
import City from './city/index.vue'
import NumberBox from './number-box/index.vue'
import Btn from './btn/index.vue'
import { useIntersectionObserver } from '@vueuse/core'
// 导入默认图片
import defaultImg from '@/assets/images/200.png'

export default {
  install(app: App) {
    // app.component('Skeleton', Skeleton)
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(More.name, More)
    app.component(BreadItem.name, BreadItem)
    app.component(Bread.name, Bread)
    app.component(City.name, City)
    app.component(NumberBox.name, NumberBox)
    app.component(Btn.name, Btn)

    // 全局注册指令
    // 参数1: 指令名
    // 参数2: 配置项
    app.directive('lazy', {
      // Vue2: 当绑定的元素插入到 DOM 中时执行, inserted
      // inserted(el, binding) {}
      // Vue3: 改为了 mounted
      mounted(el, binding) {
        // el: 当前指令绑定的 DOM 元素
        // console.log(el, binding)
        // 逻辑: 当 el 进入可视区后, 给它设置 src 属性
        const { stop } =useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 停止监听，防止重复发送请求
            stop()
            el.src = binding.value
            // 对图片加载错误时进行处理
            el.onerror = () => {
              el.src = defaultImg
            }
          }
        })
      }
    })
  }
}
