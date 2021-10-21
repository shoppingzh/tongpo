/**
 * 高德地图支持
 */
import AMapLoader from '@amap/amap-jsapi-loader'

let loader = null

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
          if (status === 'complete' || status === 'no_data') {
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
          if (status === 'complete') {
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
            return resolve(data)
          }
          return reject()
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}