<template>
  <div>
    <video ref="video" @canplay="play" />
  </div>
</template>

<script>
import { getUserMedia } from 'tongpo/lib/media'
import { onMounted, onUnmounted, ref } from '@vue/composition-api'

export default {
  setup(props, ctx) {
    const video = ref(null)
    const play = () => {
      video.value.play()
    }
    onMounted(async() => {
      const stream = await getUserMedia({ video: true, audio: true })
      video.value.srcObject = stream
      onUnmounted(() => {
        stream.getTracks().forEach(t => t.stop())
      })
    })
    
    return {
      video,
      play
    }
  }
}
</script>

<style lang="stylus" scoped>
  video {
    width: 500px;
    height: 300px;
    background-color: rgba(0, 0, 0, .85);
  }
</style>