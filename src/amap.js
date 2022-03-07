/**
 * 高德地图支持
 */
import AMapLoader from '@amap/amap-jsapi-loader'

let loader = null
const STATUS = {
  COMPLETE: 'complete',
  NO_DATA: 'no_data'
}

/**
 * 初始化AMap
 * @param {Object} options 初始化参数
 */
export function init(options) {
  loader = AMapLoader.load(options)
}

/**
 * 获取AMap(在此之前请确保已经初始化)
 */
export function getAMap() {
  if (!loader) throw new Error('请先初始化AMap')
  return new Promise((resolve, reject) => {
    loader.then(AMap => {
      resolve(AMap)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 逆地理编码：根据经纬度获取地理位置信息
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 */
export function getAddress(lng, lat) {
  return new Promise(async(resolve, reject) => {
    try {
      const AMap = await getAMap()
      AMap.plugin(['AMap.Geocoder'], () => {
        const geocoder = new AMap.Geocoder({})
        geocoder.getAddress(new AMap.LngLat(lng, lat), (status, result) => {
          if (status === STATUS.COMPLETE || status === STATUS.NO_DATA) {
            resolve(result)
          } else {
            reject(result)
          }
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 获取当前位置
 * lat 纬度
 * lng 经度
 * country 国家
 * province 省份
 * city 城市
 * cityCode 城市编码
 * district 区
 * street 街道
 * streetNumber 街道号
 * adcode 邮政编码
 * @returns 
 */
export function getLocation() {
  return new Promise(async(resolve, reject) => {
    try {
      const AMap = await getAMap()
      AMap.plugin('AMap.Geolocation', () => {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          GeoLocationFirst: true
        })
        geolocation.getCurrentPosition((status, result) => {
          if (status !== STATUS.COMPLETE) return reject()
          const data = {}
          data.lat = result.position.lat
          data.lng = result.position.lng
          const addr = result.addressComponent
          if (addr) {
            data.country = addr.country
            data.province = addr.province
            data.city = addr.city
            data.cityCode = addr.citycode
            data.district = addr.district
            data.street = addr.street
            data.streetNumber = addr.streetNumber
            data.adcode = addr.adcode
          }
          data.address = result.formattedAddress
          resolve(data)
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * 计算亮点间的距离
 * Point: { lng: number, lat: number }
 * @param {Point} p1 点1
 * @param {Point} p2 点2
 */
export function getDistance(p1, p2) {
  return new Promise(async(resolve, reject) => {
    try {
      const AMap = await getAMap()
      resolve(AMap.GeometryUtil.distance([p1.lng, p1.lat], [p2.lng, p2.lat]))
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * 根据IP获取当前的身份城市
 * @returns 
 */
export function getProvinceCity() {
  return new Promise(async(resolve, reject) => {
    try {
      const AMap = await getAMap()
      AMap.plugin('AMap.CitySearch', () => {
        const cs = new AMap.CitySearch()
        cs.getLocalCity((status, result) => {
          if (status !== STATUS.COMPLETE || result.info !== 'OK') return reject()
          resolve({
            province: result.province,
            city: result.city
          })
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}
