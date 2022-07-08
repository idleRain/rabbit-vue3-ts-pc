// 统一的注册所有的全局组件
import { App } from 'vue'
import Skeleton from '@/components/skeleton/index.vue'
import Carousel from '@/components/carousel/index.vue'
import More from '@/components/more/index.vue'

export default {
  install(app: App) {
    // app.component('Skeleton', Skeleton)
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(More.name, More)
  }
}
