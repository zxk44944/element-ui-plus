<template>
  <div>
    <slider-form :formGroups="formGroups"></slider-form>
  </div>
</template>

<script>
import SliderForm from '../../components/common/SliderForm.vue'
import { FormItem } from '../../components/common/utils/formUtil'
import commonUtil from '../../utils/commonUtil'

export default {
  components: {
    SliderForm
  },
  data() {
    return {
      formGroups: [
        FormItem.createText('用户姓名', 'name'),
        FormItem.createText('联系电话', 'phone'),
        FormItem.createSelect('楼栋号', 'buildingNum'),
        FormItem.createText('房间号', 'roomNum'),
        FormItem.createText('开通时间', 'startDate'),
        FormItem.createText('客户编码', 'bossNum'),
        FormItem.createText('备注', 'remark'),
        FormItem.createSelect('迁移楼栋号', 'transferBuildingNum'),
        FormItem.createText('迁移房间号', 'transferRoomNum'),
        FormItem.createText('迁移时间', 'transferDate'),
        FormItem.createText('迁移费用', 'transferCharge'),

      ]
    }
  },
  methods: {}
}
</script>

<style>
</style>
