const inputTypeEnum = {
  text: 'text',
  textarea: 'textarea',
  select: 'select',
  multiSelect: 'multiSelect',
  label: 'label',
  dateRange: 'dateRange',
  toolbar: 'toolbar'
}
class FormItem {
  constructor(label, prop, inputType) {
    this.label = label
    this.prop = prop
    this.inputType = inputType
    this.inputOptions = {
      getOptions: () => []
    }
  }

  static createText(label, prop) {
    return new FormItem(label, prop, inputTypeEnum.text)
  }
  static createTextArea(label, prop) {
    return new FormItem(label, prop, inputTypeEnum.textarea)
  }
  static createSelect(label, prop) {
    return new FormItem(label, prop, inputTypeEnum.select)
  }
  static createMultiSelect(label, prop) {
    return new FormItem(label, prop, inputTypeEnum.multiSelect)
  }
  static createLabel(label, prop) {
    return new FormItem(label, prop, inputTypeEnum.label)
  }
  static createDateRange(label, prop) {
    return new FormItem(label, prop, inputTypeEnum.dateRange)
  }
  static createToolbar(label, prop) {
    return new FormItem(label, prop, inputTypeEnum.toolbar)
  }
  configSelectGetOptions(getOptions) {
    this.inputOptions.getOptions = getOptions
    return this
  }
}

export { FormItem, inputTypeEnum }
