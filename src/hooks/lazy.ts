import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// 数据懒加载
export function useLazyData(callback: () => void ) {
  // 观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
  const target = ref(null)
  const { stop } = useIntersectionObserver(target, ([{isIntersecting}]) => {
    // 如果元素进入到页面可视区
    if (isIntersecting) {
      // 停止监听
      callback()
      stop()
    }
  }, { threshold: 0 })
  return target
}
