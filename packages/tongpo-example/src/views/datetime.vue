<template>
  <div class="page-container">
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
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { getWeeks } from 'tongpo-core/src/datetime'

export default {
  setup() {
    const beginDate = ref('')
    const endDate = ref('')
    
    const weeks = computed(() => {
      if (!beginDate.value || !endDate.value) return []
      return getWeeks(beginDate.value, endDate.value)
    })

    console.log(getWeeks('2021-07-09', '2021-08-09'))

    return {
      beginDate,
      endDate,
      weeks
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
