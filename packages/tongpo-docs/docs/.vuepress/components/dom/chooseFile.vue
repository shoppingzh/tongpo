<template>
  <div>
    <a-button @click="choose"><a-icon type="file" /> 选择文件</a-button>
    <a-modal v-model="visible" :footer="null">
      <template v-if="file">
        <p
          v-for="key in ['name', 'size', 'type', 'lastModified']"
          :key="key">
          {{ key }}: {{ file[key] }}
        </p>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { chooseFile } from 'tongpo/lib/dom'
import { computed, ref } from '@vue/composition-api'

export default {
  setup(props, ctx) {
    const file = ref(null)
    const visible = computed({
      get() {
        return !!file.value
      },
      set(newVal) {
        file.value = null
      }
    })

    const choose = async() => {
      const files = await chooseFile()
      console.log(files)
      file.value = files[0]
    }
    return {
      file,
      visible,
      choose
    }
  }
}
</script>

<style>

</style>