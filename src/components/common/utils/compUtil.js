const horizonAlignEnum = {
  left: { label: 'left', value: 'left' },
  center: { label: 'center', value: 'center' },
  right: { label: 'right', value: 'right' }
}

class CompUtil {
  constructor(vm) {
    this.vm = vm
  }
  getSlotContent(slotName = 'default') {
    const slot = this.vm.$scopedSlots[slotName]
    return slot ? slot() : []
  }
}

export default CompUtil
export { horizonAlignEnum }
