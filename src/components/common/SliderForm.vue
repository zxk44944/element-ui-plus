<template>
  <div>
    <el-form label-width="10em">
      <el-form-item v-for="(item, index) in formGroups" :key="index" :label="item.label">
        <!-- text -->
        <el-input v-if="isInputTypeText(item)" key="input-text" v-model="formModel[item.prop]"></el-input>
        <!-- select -->
        <base-select
          v-if="isInputTypeSelect(item)"
          key="input-select"
          v-model="formModel[item.prop]"
          :getOptions="item.inputOptions.getOptions"
        ></base-select>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="onClickCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { inputTypeEnum } from './utils/formUtil'
import BaseSelect from './BaseSelect.vue'

export default {
  components: {
    BaseSelect
  },
  props: {
    formGroups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formModel: this.buildFormModel()
    }
  },
  methods: {
    onClickCancel() {
      this.$slider.close()
    },
    buildFormModel() {
      const model = {}
      for (const item of this.formGroups) {
        model[item.prop] = ''
      }
      return model
    },
    isInputTypeText(item) {
      return item.inputType === inputTypeEnum.text
    },
    isInputTypeSelect(item) {
      return item.inputType === inputTypeEnum.select
    }
  }
}
</script>

<style>
</style>
