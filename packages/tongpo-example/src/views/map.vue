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

    <Example title="计算两点间的距离">
      <h3>点1</h3>
      <div>
        <input v-model="p1.lng" placeholder="点1经度" />
        <input v-model="p1.lat" placeholder="点1纬度" />
      </div>
      <h3>点2</h3>
      <div>
        <input v-model="p2.lng" placeholder="点2经度" />
        <input v-model="p2.lat" placeholder="点2纬度" />
      </div>
      <div>
        <button @click="handleParseDis">计算距离</button>
      </div>
      <div>
        两点距离：{{ dis }}米
      </div>
    </Example>

  </div>
</template>

<script>
import { init, getAMap, getLocation, getAddress, getDistance } from 'tongpo/lib/amap'
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

    const p1 = reactive({
      lng: null,
      lat: null
    })
    const p2 = reactive({
      lng: null,
      lat: null
    })
    const dis = ref(0)
    const handleParseDis = async() => {
      dis.value = await getDistance(p1, p2)
    }

    return {
      loc,
      handleGetLocation,
      
      parse,
      parseAddr,
      handleParse,

      p1,
      p2,
      dis,
      handleParseDis
    }
  }
}
</script>

<style>

</style>