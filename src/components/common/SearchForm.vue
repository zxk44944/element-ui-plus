<template>
  <div class="custom-component-search-form">
    <el-form label-width="6em">
      <el-row v-for="(row, rowIndex) in conditionChunks" :key="rowIndex">
        <el-col v-for="(item, itemIndex) in row" :key="itemIndex" :span="colSpan">
          <el-form-item :label="item.label">
            <!-- text -->
            <base-input
              v-if="isInputTypeText(item)"
              key="input-text"
              v-model="formModel[item.prop]"
            ></base-input>
            <!-- select -->
            <base-select
              v-if="isInputTypeSelect(item)"
              key="input-select"
              v-model="formModel[item.prop]"
              :getOptions="item.inputOptions.getOptions"
            ></base-select>
            <!-- date range -->
            <base-date-range
              v-if="isInputTypeDateRange(item)"
              key="input-date-range"
              v-model="formModel[item.prop]"
            ></base-date-range>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- toolbar -->
    <div class="toolbar">
      <el-button type="primary">查询</el-button>
      <el-button>清除</el-button>
    </div>
  </div>
</template>

<script>
import { inputTypeEnum } from './utils/formUtil'
import BaseSelect from './BaseSelect.vue'
import BaseDateRange from './BaseDateRange.vue'
import BaseInput from './BaseInput.vue'
import commonUtil from '../../utils/commonUtil'

const COLS_PER_ROW = 3

export default {
  components: {
    BaseSelect,
    BaseDateRange,
    BaseInput
  },
  props: {
    conditions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formModel: this.buildFormModel(),
      conditionChunks: commonUtil.chunk(this.conditions, COLS_PER_ROW),
      colSpan: 24 / COLS_PER_ROW
    }
  },
  methods: {
    buildFormModel() {
      const model = {}
      for (const item of this.conditions) {
        model[item.prop] = ''
      }
      return model
    },
    isInputTypeText(item) {
      return item.inputType === inputTypeEnum.text
    },
    isInputTypeSelect(item) {
      return item.inputType === inputTypeEnum.select
    },
    isInputTypeDateRange(item) {
      return item.inputType === inputTypeEnum.dateRange
    },
  }
}
</script>

<style lang="less">
.custom-component-search-form {
  .toolbar {
    text-align: center;
  }
}
</style>
