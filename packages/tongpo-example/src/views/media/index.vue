<template>
  <div>
    <button @click="checkSupport">检查是否支持</button>
    <div style="padding: 20px;">
      <video ref="media" @loadeddata="play" />
      <div>
        <div class="indicator" :class="{ 'is-active': active, 'is-inactive': !active }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { isSupport, getUserMedia } from 'tongpo/lib/media'
import { onMounted, onUnmounted, ref } from 'vue'
const active = ref(false)
const media = ref(null)

const checkSupport = () => {
  alert(isSupport() ? '支持' : '不支持')
}

const open = async() => {
  try {
    const stream = await getUserMedia({ video: true, audio: true })
    media.value.srcObject = stream
    active.value = true
    stream.oninactive = () => {
      active.value = false
      open()
    }
  } catch (err) {
    active.value = false
    open()
  }
}

const play = () => {
  media.value && media.value.play()
}

onMounted(() => {
  open()
})

</script>

<style lang="less" scoped>
  .indicator {
    @size: 20px;
    width: @size;
    height: @size;
    border-radius: 50%;
    background-color: #ccc;
    &.is-active {
      background-color: green;
    }
    &.is-inactive {
      background-color: red;
    }
  }
  video {
    width: 400px;
    height: 250px;
    background-color: rgb(20, 20, 20);
  }
</style>