// 选择的城市结果类型
export interface CityResult {
    provinceCode: string
    provinceName: string
    cityCode: string
    cityName: string
    countyCode: string
    countyName: string
}

// 城市列表类型
export interface AreaList {
    code: string
    level: number
    name: string
    areaList: AreaList[]
}