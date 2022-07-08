import useCategoryStore from '@/store/modules/category'
import useHomeStore from '@/store/modules/home'

export default function useStore() {
  return {
    category: useCategoryStore(),
    home: useHomeStore()
  }
}
