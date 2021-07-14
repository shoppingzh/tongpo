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