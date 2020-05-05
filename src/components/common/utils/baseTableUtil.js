import { iconSet } from './iconUtil'
import commonUtil from '../../../utils/commonUtil'
import { horizonAlignEnum } from './compUtil'

const colTypeEnum = {
  bind: { label: 'bind', value: 'bind' },
  index: { label: 'index', value: 'index' },
  selection: { label: 'selection', value: 'selection' },
  action: { label: 'action', value: 'action' },
  link: { label: 'link', value: 'link' }
}

class TableColumn {
  constructor(label, name, prop) {
    this.id = commonUtil.uniqueId('col')
    this.name = name
    this.label = label
    this.type = colTypeEnum.bind.value
    this.headerAlign = horizonAlignEnum.left.value
    this.align = horizonAlignEnum.left.value

    // binding col
    this.prop = name
    if (typeof prop === 'string') {
      this.prop = prop
    }
    // action col
    this.actions = []
  }
  static indexCol() {
    const col = new TableColumn('#')
    col.type = colTypeEnum.index.value
    col.headerAlign = horizonAlignEnum.left.value
    col.align = horizonAlignEnum.left.value
    return col
  }
  static selectCol() {
    const col = new TableColumn()
    col.type = colTypeEnum.selection.value
    col.headerAlign = horizonAlignEnum.center.value
    col.align = horizonAlignEnum.center.value
    return col
  }
  static actionCol(label) {
    const col = new TableColumn(label)
    col.type = colTypeEnum.action.value
    return col
  }
  addEditAction(handler, title) {
    title = title || '编辑'
    const icon = iconSet.editDefault.value
    return this.addAction('编辑', icon, title, handler)
  }
  addAction(label, icon, title, handler) {
    const action = {
      label,
      icon,
      title,
      handler
    }
    this.actions.push(action)
    return this
  }
}
export { TableColumn, colTypeEnum }
