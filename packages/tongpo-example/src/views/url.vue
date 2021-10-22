<template>
  <div>
    <Example title="解析URL">
      <div>
        <input v-model="url" style="display: block; width: 100%;" >
      </div>
      <button @click="handleParse" style="margin-top: 12px;">解析</button>
      <pre>
        {{ parseUrl }}
      </pre>
    </Example>
  </div>
</template>

<script>
import { ref } from 'vue'
import { parse } from 'tongpo/lib/url'

export default {
  setup() {
    const url = ref('')
    const parseUrl = ref(null)
    const handleParse = () => {
      parseUrl.value = parse(url.value)
      console.log(parseUrl.value)
    }
    return {
      url,
      parseUrl,

      handleParse
    }
  }
}
</script>

<style>

</style>
