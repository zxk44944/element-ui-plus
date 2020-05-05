<template>
  <div class="custom-component-base-table">
    <!-- toolbar -->
    <div class="part-toolbar">
      <slot name="toolbar"></slot>
    </div>
    <!-- table -->
    <el-table
      class="part-table"
      :data="tableData"
      border
      header-cell-class-name="header-cell"
      height="100px"
    >
      <template v-for="(col) in cols">
        <!-- custom -->
        <render-vnode v-if="isCustomCol(col)" :key="col.id" :node="getCustomCol(col)"></render-vnode>
        <!-- select -->
        <el-table-column
          v-else-if="isSectionCol(col)"
          :key="col.id"
          type="selection"
          :align="col.align"
          :header-align="col.headerAlign"
        ></el-table-column>
        <!-- index -->
        <el-table-column
          v-else-if="isIndexCol(col)"
          :key="col.id"
          :label="col.label"
          type="index"
          :align="col.align"
          :header-align="col.headerAlign"
        ></el-table-column>
        <!-- bind -->
        <el-table-column
          v-else-if="isBindCol(col)"
          :key="col.id"
          :label="col.label"
          :prop="col.prop"
          :align="col.align"
          :header-align="col.headerAlign"
        ></el-table-column>
        <!-- action -->
        <el-table-column
          v-else-if="isActionCol(col)"
          :key="col.id"
          :label="col.label"
          :align="col.align"
          :header-align="col.headerAlign"
        >
          <el-button v-for="(act, index) in col.actions" :key="index" :icon="act.icon">{{act.label}}</el-button>
        </el-table-column>
      </template>
    </el-table>
    <!-- pager -->
    <el-pagination
      class="part-pager"
      v-loading="tableIsLoading"
      :page-sizes="pageSizeEnum"
      :page-size="pageSize"
      :total="pageTotal"
      :current-page="pageIndex"
      layout="total, sizes, prev, pager, next"
      @size-change="onPageSizeChange"
      @current-change="onPageCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import CompUtil from './utils/compUtil'
import commonUtil from '../../utils/commonUtil'
import { colTypeEnum } from './utils/baseTableUtil'

const pageSizeList = [10, 20, 50, 100]
export default {
  props: {
    cols: {
      default() {
        return []
      }
    },
    getData: {
      default() {
        return []
      }
    },
    autoFirstLoad: {
      type: Boolean,
      default: true
    },
    reloadSignal: {
      type: Number,
      default: 1
    }
  },
  components: {
    RenderVnode: {
      functional: true,
      render(h, context) {
        return context.props.node
      }
    }
  },
  data() {
    return {
      pageSizeEnum: pageSizeList,
      pageSize: pageSizeList[1],
      pageTotal: 0,
      pageIndex: 1,
      tableData: [],
      tableIsLoading: false,
      compUtil: new CompUtil(this)
    }
  },
  mounted() {
    this.autoFirstLoad && this.loadPageData()
  },
  watch: {
    reloadSignal: {
      handler() {
        this.loadPageData()
      }
    }
  },
  methods: {
    onPageSizeChange(size) {
      this.pageIndex = 1
      this.pageSize = size
      this.loadPageData()
    },
    onPageCurrentChange(index) {
      this.pageIndex = index
      this.loadPageData()
    },
    loadPageData() {
      this.tableIsLoading = true
      this.getDataAsync(this.pageSize, this.pageIndex)
        .then(result => {
          this.pageTotal = result.total
          this.tableData = result.data
        })
        .finally(() => {
          this.tableIsLoading = false
        })
    },
    async getDataAsync(size, index) {
      return this.getData(size, index)
    },
    getCustomCol(col) {
      const content = this.compUtil.getSlotContent()
      return content.find(
        item => commonUtil.at(item, 'data.attrs.data-for') === col.name
      )
    },
    isCustomCol(col) {
      return !!this.getCustomCol(col)
    },
    // check col type
    isBindCol(col) {
      return col.type === colTypeEnum.bind.value
    },
    isIndexCol(col) {
      return col.type === colTypeEnum.index.value
    },
    isSectionCol(col) {
      return col.type === colTypeEnum.selection.value
    },
    isActionCol(col) {
      return col.type === colTypeEnum.action.value
    },
    isLinkCol(col) {
      return col.type === colTypeEnum.link.value
    }
  }
}
</script>

<style lang="less">
.custom-component-base-table {
  flex: 1;
  display: flex;
  flex-direction: column;

  .part-table {
    flex: 1;
  }

  .header-cell {
    background-color :lavender;
  }
}
</style>
