<template>
  <div>
    <button @click="handleDestroy">销毁第一个频道</button>
  </div>
</template>

<script>
import Client from '../../../../tongpo-core/lib/message'
import { Stomp } from '@stomp/stompjs'

export default {
  setup(props, ctx) {
    const client = new Client('http://192.168.1.43:88/api/endpoint', {
      debug: true
    })
    const channel = client.openChannel('/topic/classroom/307082614768934912/teach')
    channel.onMessage(frame => {
      console.log('收到一条消息：')
      console.log(frame)
    })
    setTimeout(() => {
      client.openChannel('test-channel')
    }, 3000)

    const handleDestroy = () => {
      channel && channel.destroy()
    }
    return {
      handleDestroy
    }
  }
}
</script>

<style>

</style>
