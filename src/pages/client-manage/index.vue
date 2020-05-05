<template>
  <div>
    <search-form :conditions="conditions"></search-form>
    <base-table :getData="getData" :cols="cols">
      <div slot="toolbar">
        <el-button @click="onCreateEntry">新建</el-button>
        <el-button>导出</el-button>
      </div>
    </base-table>
  </div>
</template>

<script>
import SearchForm from '../../components/common/SearchForm.vue'
import { FormItem } from '../../components/common/utils/formUtil'
import BaseTable from '../../components/common/BaseTable.vue'
import { TableColumn } from '../../components/common/utils/baseTableUtil'
import commonUtil from '../../utils/commonUtil'

export default {
  components: {
    BaseTable,
    SearchForm
  },
  data() {
    return {
      cols: [
        TableColumn.indexCol(),
        TableColumn.selectCol(),
        new TableColumn(' 用户姓名', 'name'),
        new TableColumn('联系电话', 'phone'),
        new TableColumn('楼栋号', 'bulidingNum'),
        new TableColumn('房间号', 'roomNum'),
        new TableColumn('开通/续费日期', 'startDate'),
        new TableColumn('到期日期', 'endDate'),
        new TableColumn('Boss系统编码', 'bossNum'),
        new TableColumn('备注', 'remark'),
        new TableColumn('录入人', 'caeator'),
        new TableColumn('录入时间', 'caeateTime'),
        TableColumn.actionCol('操作').addEditAction()
      ],
      conditions: [
        FormItem.createSelect('状态', 'status'),
        FormItem.createText('用户姓名', 'name'),
        FormItem.createText('联系电话', 'phone'),
        FormItem.createSelect('楼栋号', 'buildingNum'),
        FormItem.createText('房间号', 'roomNum')
      ]
    }
  },
  methods: {
    onCreateEntry() {
      this.$slider.open({
        title: '创建客人信息',
        component: () => import('./EntryCreate.vue')
      })
    },
    getData(pageSize, pageIndex) {
      const total = 100
      const data = [
        {
          name: 'my city',
          phone: 'my zip',
          bulidingNum: 'my city',
          roomNum: 'my zip',
          startDate: 'my city',
          endDate: 'my zip',
          bossNum: 'my city',
          remark: 'my zip',
          caeator: 'my city',
          caeateTime: 'my zip'
        }
      ]
      return { total, data }
    }
  }
}
</script>

<style>
</style>
