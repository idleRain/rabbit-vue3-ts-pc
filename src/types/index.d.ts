// 导航的每一项
export interface CategoryItem {
  id: string
  name: string
  picture: string
  open?: boolean
  children: CategoryItem[]
}

// axios 请求的接口
export interface ApiRes<T> {
  code: string
  msg: string
  result: T[]
}
