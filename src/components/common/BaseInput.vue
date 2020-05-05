<template>
  <el-input v-bind="$attrs" :value="value" @input="onInput"></el-input>
</template>

<script>
const events = {
  inputValue: 'input-value'
}
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: events.inputValue
  },
  methods: {
    onInput(value) {
      this.vmodel(value)
    },
    vmodel(value) {
      this.$emit(events.inputValue, value)
    }
  }
}
</script>

<style>
</style>
