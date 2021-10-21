<template>
  <div>
    <Example title="初始化">

    </Example>
    <Example title="定位">
      <button @click="handleGetLocation">获取当前位置</button>
      <pre>
        {{ loc }}
      </pre>
    </Example>

    <Example title="经纬度反解析地理位置">
      <div>
        <input v-model="parse.lng" placeholder="经度(lng)">
      </div>
      <div>
        <input v-model="parse.lat" placeholder="纬度(lat)">
      </div>
      <div>
        <button @click="handleParse">解析</button>
      </div>
      <div>
        {{ parseAddr }}
      </div>
    </Example>
  </div>
</template>

<script>
import { init, getAMap, getLocation, getAddress } from 'tongpo/lib/amap'
import { reactive, ref } from 'vue'
export default {
  setup() {
    init({
      key: '09f686b9ad6aa4160ad31c313546f3d6'
    })
    getAMap().then(AMap => {
      console.log(AMap)
      const dis = AMap.GeometryUtil.distanceToSegment([116.450378, 39.947585], [116.434027, 39.941037], [116.461665, 39.941564])
      console.log(dis)
    })

    const loc = ref(null)
    const handleGetLocation = () => {
      getLocation().then(data => {
        loc.value = data
      })
    }

    const parse = reactive({
      lat: null,
      lng: null
    })
    const parseAddr = ref(null)
    const handleParse = async() => {
      const addr = await getAddress(parse.lng, parse.lat)
      parseAddr.value = addr
    }

    return {
      loc,
      handleGetLocation,
      
      parse,
      parseAddr,
      handleParse
    }
  }
}
</script>

<style>

</style>