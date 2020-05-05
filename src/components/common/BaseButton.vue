<template>
  <el-button v-bind="$attrs" :type="type" :loading="isLoading" @click="onClick">
    <slot></slot>
  </el-button>
</template>

<script>
import { pubUtil } from '../../utils/appUtil'
export default {
  props: {
    click: {
      type: Function
    },
    type: {
      type: String
    },
    // wait milliseconds
    wait: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    onClick() {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      Promise.all([this.handleClick(), pubUtil.wait(this.wait)]).finally(
        () => (this.isLoading = false)
      )
    },
    async handleClick() {
      if (this.click) {
        return this.click()
      }
    }
  }
}
</script>

<style>
</style>
