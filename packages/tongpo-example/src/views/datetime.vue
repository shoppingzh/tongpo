<template>
  <div class="page-container">
    <Example title="获取周日期列表">
      <div>
        开始日期：<input v-model="beginDate" type="date">
      </div>
      <div>
        结束日期：<input v-model="endDate" type="date">
      </div>
      <div class="result">
        <div
          v-for="(week, index) in weeks"
          :key="index"
          class="week-item">
          <div
            v-for="(day, index2) in week"
            :key="index2"
            class="day-item">
            {{ new Date(day).toLocaleString() }}
          </div>
        </div>
      </div>
    </Example>

    <Example title="获取秒数">
      <div>
        输入时间：<input v-model="time" type="text">
      </div>
      <div style="margin-top: 10px;">
        {{ seconds }} 秒
      </div>
    </Example>

  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { getWeeks, getSeconds } from 'tongpo/lib/datetime'

export default {
  setup() {
    const beginDate = ref('')
    const endDate = ref('')
    
    const weeks = computed(() => {
      if (!beginDate.value || !endDate.value) return []
      return getWeeks(beginDate.value, endDate.value)
    })

    const time = ref('')
    const seconds = computed(() => {
      return time.value ? getSeconds(time.value) : null
    })

    return {
      beginDate,
      endDate,
      weeks,
      
      time,
      seconds
    }
  }
}
</script>

<style lang="less" scoped>
  .result {
    padding: 20px;
    background-color: #fff;
    .week-item {
      padding: 10px;
      border: 1px solid orange;
      margin-bottom: 10px;
    }
    .day-item {
      padding: 5px 0;
    }
  }
</style>
