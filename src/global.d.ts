import Skeleton from '@/components/skeleton/index.vue'
import Carousel from '@/components/carousel/index.vue'
import More from '@/components/more/index.vue'
import BreadItem from '@/components/more/index.vue'
import Bread from '@/components/more/index.vue'
import City from '@/components/city/index.vue'
import NumberBox from '@/components/number-box/index.vue'
import Checkbox from '@/components/checkbox/index.vue'
import Message from '@/components/message/message.vue'
// 参考1: https://stackoverflow.com/questions/69010567/how-to-make-vscode-recognize-global-component-in-vue
// 参考2: https://github.com/element-plus/element-plus/blob/dev/global.d.ts

// declare module '@vue/runtime-core' works for vue 3
// declare module 'vue' works for vue2 + vue 3
declare module 'vue' {
  export interface GlobalComponents {
    Skeleton: typeof Skeleton
    Carousel: typeof Carousel
    More: typeof More
    BreadItem: typeof BreadItem
    Bread: typeof Bread
    City: typeof City
    NumberBox: typeof NumberBox
    Btn: typeof Btn
    Checkbox: typeof Checkbox
    Message: typeof Message
  }
}
export {}
