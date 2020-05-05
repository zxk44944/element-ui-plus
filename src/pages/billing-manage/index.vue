<template>
  <div>
    <search-form :conditions="conditions"></search-form>
    <base-table :getData="getData" :cols="cols">
    <div slot="toolbar">
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
        new TableColumn('上半月使用天数', 'firstHalfMonthDay'),
        new TableColumn('下半月使用天数', 'lastHalfMonthDay'),
        new TableColumn('上半月使用费用', 'firstHalfMonthCharge'),
        new TableColumn('下半月使用费用', 'lastHalfMonthCharge'),
        new TableColumn('整月合计费用', 'sumCharge'),
        new TableColumn('到期日期', 'endDate'),
        new TableColumn('缴费明细', 'chargeDetails'),
        TableColumn.actionCol('操作').addEditAction()
      ],
      conditions: [
        FormItem.createText('用户姓名', 'name'),
        FormItem.createText('联系电话','phone'),
        FormItem.createSelect('楼栋号','buildingNum'),
        FormItem.createText('房间号','roomNum'),
        FormItem.createDateRange('结算时间','startDate')
      ]
    }
  },
  methods: {
    getData(pageSize, pageIndex) {
      const total = 100
      const data = [
        {
          name: 'my city',
          phone: 'my zip',
          bulidingNum: 'my city',
          roomNum: 'my zip',
          startDate: 'my city',
          firstHalfMonthDay: 'my zip',
          lastHalfMonthDay: 'my city',
          firstHalfMonthCharge: 'my city',
          lastHalfMonthCharge: 'my zip',
          sumCharge: 'my city',
          endDate: 'my zip',
          chargeDetails: 'my city'
        }
      ]
      return { total, data }
    }
  }
}
</script>

<style>
</style>
