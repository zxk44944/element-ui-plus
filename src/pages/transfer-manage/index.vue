<template>
  <div>
    <search-form :conditions="conditions"></search-form>
    <base-table :getData="getData" :cols="cols"></base-table>
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
        new TableColumn('原楼栋号', 'oldBulidingNum'),
        new TableColumn('原房间号', 'oldRoomNum'),
        new TableColumn('现楼栋号', 'newBulidingNum'),
        new TableColumn('现房间号', 'newRoomNum'),
        new TableColumn('迁移时间', 'transDate'),
        new TableColumn('迁移费用', 'charge'),
        new TableColumn('备注', 'remark'),
        new TableColumn('录入人', 'caeator'),
        new TableColumn('录入时间', 'caeateTime'),
        TableColumn.actionCol('操作').addEditAction()
      ],
      conditions: [
        FormItem.createText('用户姓名', 'name'),
        FormItem.createText('联系电话', 'phone'),
        FormItem.createSelect('楼栋号', 'buildingNum'),
        FormItem.createText('房间号', 'roomNum'),
        FormItem.createDateRange('迁移时间', 'startDate')
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
          oldBulidingNum: 'my city',
          oldRoomNum: 'my zip',
          newBulidingNum: 'my city',
          newRoomNum: 'my zip',
          transDate: 'my city',
          charge: 'my city',
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
