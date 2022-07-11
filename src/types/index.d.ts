// axios 请求的接口
export interface ApiRes<T> {
  code: string
  msg: string
  result: T
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

export interface NewItem {
	id: string;
	name: string;
	desc: string;
	price: string;
	picture: string;
	discount?: any;
	orderNum: number;
}

export interface HotItem {
	id: string;
	picture: string;
	title: string;
	alt: string;
}

export interface BrandItem {
	id: string
	name: string
	nameEn: string
	logo: string
	picture: string
	type?: any
	desc: string
	place: string
}


// 首页商品推荐
export type HomeProduct = {
	id: string
	name: string
	picture: string
	saleInfo: string
	children: {
		id: string
		name: string
	}[]
	goods: {
		id: string
		name: string
		desc: string
		price: string
		picture: string
		discount?: any
		orderNum: number
	}[]
}

// 最新专题
export type SpecialItem = {
	creator: string
	isDelete: number
	createTime: string
	updateTime: string
	id: string
	classificationId: string
	title: string
	summary: string
	lowestPrice: number
	cover: string
	detailsUrl: string
	collectNum: number
	viewNum: number
	replyNum: number
}

// 顶级分类类型
export type TopCategory = {
	id: string
	name: string
	picture: string
	children: CategoryItem[]
}

export type SaleProperty = {
	id: string
	name: string
	properties: {
		id: string
		name: string
	}[]
}

export type SubCategory = {
	id: string
	name: string
	picture?: any
	parentId: string
	parentName: string
	brands: {
		id: string
		name: string
		nameEn: string
		logo: string
		picture: string
		type?: any
		desc: string
		place: string
	}[]
	saleProperties: SaleProperty[]
}
