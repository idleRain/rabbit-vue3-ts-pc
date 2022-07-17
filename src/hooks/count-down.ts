/**
 * 封装一个倒计时功能
 */
import { useIntervalFn } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

export function useCountDown(count: number = 60) {
  const time = ref(0)
  const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value === 0) {
        pause()
      }
    },
    1000,
    { immediate: false }
  )

  // 组件销毁时清除定时器
  onUnmounted(() => {
    pause()
  })

  const start = () => {
    // 如果倒计时没结束，则不再执行
    if (time.value > 0) return
    time.value = count
    resume()
  }

  return {
    time,
    start
  }
}
