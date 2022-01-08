<template>
  <div>
    <a-input
      v-model="cssText"
      type="textarea"
      :autosize="{ minRows: 4 }" />
    <div style="margin-top: 10px;">
      <a-button type="primary" @click="createSheet">插入样式表</a-button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { createOrUpdateStylesheet } from 'tongpo/lib/dom'

const CSS = `.example {
  background-color: rgb(20, 20, 20)!important;
  color: #fff;
}`

export default {
  setup(props, ctx) {
    const cssText = ref(CSS)

    const createSheet = () => {
      createOrUpdateStylesheet('test', cssText.value)
    }
    return {
      cssText,

      createSheet
    }
  }
}
</script>

<style>

</style>