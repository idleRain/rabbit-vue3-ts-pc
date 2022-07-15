import useCategoryStore from '@/store/modules/category'
import useHomeStore from '@/store/modules/home'
import useGoodsStore from '@/store/modules/goods'
import useUserStore from '@/store/modules/user'

export default function useStore() {
  return {
    category: useCategoryStore(),
    home: useHomeStore(),
    goods: useGoodsStore(),
    user: useUserStore(),
  }
}
