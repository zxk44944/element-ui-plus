<template>
  <div v-if="hasTabs" class="the-slider" :class="sliderClassList">
    <el-tabs
      class="the-slider__tabs"
      v-model="activeTabName"
      type="border-card"
      closable
      @tab-remove="onRemoveTab"
    >
      <el-tab-pane v-for="(tab) in tabList" :key="tab.name" :name="tab.name" :label="tab.title">
        <div>
          <component :is="tab.component" v-bind="tab.props" v-on="tab.events"></component>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import commonUtil from '../../utils/commonUtil'

class Tab {
  constructor() {
    this.component = {
      render(h) {
        return h('div', 'please provide a component')
      }
    }
    this.title = '未命名'
    this.props = {}
    this.events = {}
    this.key = ''
    this.name = commonUtil.uniqueId()
  }
}

export default {
  data() {
    return {
      tabList: [],
      activeTabName: ''
    }
  },
  computed: {
    hasTabs() {
      return this.tabList.length > 0
    },
    sliderClassList() {
      return {
        'the-slider--show': this.hasTabs
      }
    }
  },
  created() {
    const slider = {
      open: this.openTab,
      close: this.removeActiveTab
    }
    Vue.prototype.$slider = slider
  },
  methods: {
    onRemoveTab(tabName) {
      if (tabName === this.activeTabName) {
        this.removeActiveTab()
      } else {
        this.removeTab(tabName)
      }
    },
    removeTab(tabName) {
      this.tabList = this.tabList.filter(tab => tab.name !== tabName)
    },
    removeActiveTab() {
      const activeIndex = this.tabList.findIndex(
        tab => tab.name === this.activeTabName
      )
      const leftTab = this.tabList[activeIndex - 1]
      const rightTab = this.tabList[activeIndex + 1]
      const tabToShow = leftTab || rightTab
      if (tabToShow) {
        this.activeTabName = tabToShow.name
      }

      this.tabList.splice(activeIndex, 1)
    },
    openTab(tab) {
      const wellTab = Object.assign(new Tab(), tab)
      this.tabList.push(wellTab)
      this.activeTabName = wellTab.name
    }
  }
}
</script>

<style lang="less">
.the-slider {
  z-index: 9999;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 80%;
  top: 0;
  bottom: 4px;
  right: -100%;
  box-sizing: border-box;
  background-color: oldlace;

  &.the-slider--show {
    right: 0;
  }

  .the-slider__tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
    & > .el-tabs__content {
      padding: 20px;
      flex: 1;
      overflow: auto;
      background-color: #fff;
    }
  }
}
</style>
