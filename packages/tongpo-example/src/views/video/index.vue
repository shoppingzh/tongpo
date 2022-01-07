<template>
  <Example title="视频截图">
    <video ref="video" src="/1.mp4" controls style="background-color: #222; width: 500px; height: 150px; object-fit: contain;" />
    <div style="margin-top: 10px;">
      <button @click="screenshot">截图</button>
    </div>
    <div v-if="screenshotUrl" style="margin-top: 20px;">
      <img :src="screenshotUrl" >
      <div>
        <a :href="screenshotUrl" download>下载</a>
      </div>
    </div>
    
  </Example>
</template>

<script setup>
import { takeScreenshot } from 'tongpo/lib/video'
import { onUnmounted, ref } from 'vue'

const video = ref(null)
const screenshotUrl = ref(null)

const screenshot = async() => {
  screenshotUrl.value && URL.revokeObjectURL(screenshotUrl.value)
  const blob = await takeScreenshot(video.value)
  screenshotUrl.value =  URL.createObjectURL(blob)
  onUnmounted(() => {
    URL.revokeObjectURL(screenshotUrl.value)
  })
}
</script>

<style>

</style>