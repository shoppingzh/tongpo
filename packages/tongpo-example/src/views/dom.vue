<template>
  <div>
    <Example title="检测页面离开">
      {{ visible ? '可见' : '离开' }} 
      <div style="margin-top: 10px;">
        已离开页面 {{ leaveTimes }} 次
      </div>
    </Example>
    <Example title="检测页面无操作">
      {{ noAction ? '没有操作哦！' : '操作中..' }}
    </Example>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { onVisibilityChange, detectAction } from 'tongpo/lib/dom'
const visible = ref(true)
const leaveTimes = ref(0)
onVisibilityChange((val) => {
  if (!val) leaveTimes.value++
  setTimeout(() => {
    visible.value = val
  }, 300)
})

const noAction = ref(false)
const destroy = detectAction(() => {
  noAction.value = false
}, () => {
  noAction.value = true
}, 3)

onUnmounted(() => {
  destroy()
})

</script>

<style>

</style>