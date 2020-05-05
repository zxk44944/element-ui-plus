<template>
  <el-container class="bbc-app">
    <el-header class="app-header">
      <div>
        <span>BCC system</span>
        <el-button>登录</el-button>
        <el-button>退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="app-aside">
        <div>
          <el-menu :default-active="activeMenu" @select="onSelectMenu">
            <el-menu-item index="client-manage">客户管理</el-menu-item>
            <el-menu-item index="renew-manage">续费管理</el-menu-item>
            <el-menu-item index="transfer-manage">迁移管理</el-menu-item>
            <el-menu-item index="billing-manage">网络结算</el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main class="app-main">
        <component class="page-component" :is="pageComponent"></component>
        <the-slider></the-slider>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheSlider from './components/common/TheSlider.vue'

export default {
  name: 'BBC-App',
  components: {
    TheSlider
  },
  data() {
    return {
      pageComponent: '',
      activeMenu: 'client-manage'
    }
  },
  created() {
    this.renderComponent(this.activeMenu)
  },
  methods: {
    onSelectMenu(key) {
      this.renderComponent(key)
    },
    renderComponent(componentName) {
      import(`./pages/${componentName}`)
        .then(exports => {
          this.pageComponent = exports.default
        })
        .catch(() => {
          console.error(`component ${componentName} not found!`)
        })
    }
  }
}
</script>

<style lang="less">
@layout-border: 1px solid #999;

body {
  margin: 0;
  padding: 0;

  .bbc-app {
    height: 100vh;
    .el-input,
    .el-select,
    .el-date-editor {
      width: 100%;
      max-width: 300px;
    }

    .app-header {
      border-bottom: @layout-border;
    }
    .app-aside {
    }
    .app-main {
      position: relative;
      border-left: @layout-border;
      overflow: hidden;
      .page-component {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
