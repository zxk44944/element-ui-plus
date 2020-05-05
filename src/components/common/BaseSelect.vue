<template>
  <el-select
    :value="value"
    :multiple="multiple"
    :loading="isLoading"
    @change="onChange"
    @clear="onClear"
    @visible-change="onVisibleChange"
  >
    <el-option v-for="(item) in options" :key="item.value" :value="item" :label="item.label"></el-option>
  </el-select>
</template>

<script>
import commonUtil from '../../utils/commonUtil'

const events = {
  changeValue: 'change-value',
  change: 'change'
}
export default {
  props: {
    value: {
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    getOptions: {
      type: Function,
      default() {
        return []
      }
    },
    cacheKey: {
      default: ''
    }
  },
  data() {
    return {
      options: [],
      isLoading: false,
      cacheValid: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.ensureOption(newValue)
      }
    },
    cacheKey: {
      handler() {
        this.vmodel(this.getEmptyValue())
        this.options = []
        this.cacheValid = false
      }
    }
  },
  methods: {
    onChange(selection) {
      this.vmodel(selection)
      this.$emit(events.change, selection)
    },
    onClear() {
      this.vmodel(this.getEmptyValue())
    },
    onVisibleChange(visible) {
      if (visible && !this.cacheValid) {
        this.loadOptions()
      }
    },
    getEmptyValue() {
      return this.multiple ? [] : ''
    },
    loadOptions(keyword) {
      this.isLoading = true
      this.getOptionsAsyn(keyword).finally(() => {
        this.isLoading = false
      })
    },
    async getOptionsAsyn(keyword) {
      return this.getOptions(keyword)
    },
    ensureOption(opt) {
      if (commonUtil.isEmpty(opt)) return
      const index = this.options.findIndex(item => item.value === opt.value)
      index >= 0 || this.options.push(opt)
    },
    vmodel(value) {
      this.$emit(events.changeValue, value)
    }
  }
}
</script>

<style>
</style>
