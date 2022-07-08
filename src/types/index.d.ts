// axios 请求的接口
export interface ApiRes<T> {
  code: string
  msg: string
  result: T[]
}

// 导航的每一项
export interface CategoryItem {
  id: string
  name: string
  picture: string
  open?: boolean
  children: CategoryItem[]
  goods: GoodsItem[]
}

export interface GoodsItem {
	id: string;
	name: string;
	desc: string;
	price: string;
	picture: string;
	discount?: any;
	orderNum?: any;
}

export interface BannerItem {
	id: string;
	imgUrl: string;
	hrefUrl: string;
	type: string;
}
