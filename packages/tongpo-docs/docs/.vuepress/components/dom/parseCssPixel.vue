<template>
  <div>
    <a-input v-model="value" placeholder="请输入值" />
    <div style="margin-top: 10px;">
      转换结果：{{ convertValue }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import { parseCssPixel } from 'tongpo/lib/dom'

export default {
  setup(props, ctx) {
    const value = ref('')
    const convertValue = computed(() => parseCssPixel(value.value))
    return {
      value,
      convertValue
    }
  }
}
</script>

<style>

</style>